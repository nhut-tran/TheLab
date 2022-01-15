using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing.Tree;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence;


namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _db;

        public TokenService(IConfiguration config, IHttpContextAccessor httpContextAccessor, DataContext db)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _config = config;
        }

        public string CreateToken(AppUser user)
        {

            var claims = new List<Claim>() {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),

                new Claim("Title", user.Title),
                new Claim("Department", user.Department.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("JWTKey").GetValue<string>("Key")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var stringToken = tokenHandler.WriteToken(token);
            _httpContextAccessor.HttpContext.Response.Cookies.Append("Jwt", stringToken, new CookieOptions() { HttpOnly = true });
            return stringToken;

        }

        public Token CreateRefreshToken()
        {

            var random = Encoding.UTF8.GetBytes(Guid.NewGuid().ToString());

            return new Domain.Token() { RefreshToken = Convert.ToBase64String(random), ExpireTime = DateTime.UtcNow.AddDays(2) };
        }

        public AppUser GetIdentityFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super Super Key Super Super Key"));
            var validateParams = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ClockSkew = TimeSpan.Zero
            };
            var principal = tokenHandler.ValidateToken(token, validateParams, out SecurityToken securityToken);
            var jwtToken = securityToken as JwtSecurityToken;
            var i = jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

            if (jwtToken != null && i)
            {
                var id = principal.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = _db.Users.FirstOrDefault(u => u.Id == id);
                return user;
            }

            return null;

        }

        public bool ValidateRefreshToken(AppUser user, string refreshToken)
        {

            var token = _db.Token.Include(t => t.User)
            .ThenInclude(u => u.Department)
            .OrderByDescending(t => t.ExpireTime)
            .FirstOrDefault(t => t.RefreshToken == refreshToken);
            if (token != null && token.User.Id == user.Id && token.ExpireTime > DateTime.UtcNow)
            {

                return true;
            }
            return false;
        }

    }
}