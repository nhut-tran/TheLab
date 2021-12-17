using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _token;
        private readonly DataContext _db;
        public AccountController(UserManager<AppUser> userManager,


        SignInManager<AppUser> signInManager, TokenService token, DataContext db)
        {
            _db = db;
            _signInManager = signInManager;
            _token = token;
            _userManager = userManager;
        }

        [HttpPost("login")]
        [AllowAnonymous]

        public async Task<ActionResult<UserDto>> LogIn(LoginDto logInuser)
        {
            var user = await _userManager.FindByEmailAsync(logInuser.Email);


            if (user == null) return Unauthorized();
            var refreshToken = _token.CreateRefreshToken();
            user.Token.Add(refreshToken);

            await _db.Entry(user).Reference(d => d.Department).LoadAsync();

            await _db.SaveChangesAsync();

            var result = await _signInManager.CheckPasswordSignInAsync(user, logInuser.Password, false);
            if (result.Succeeded)
            {
                //  HttpContext.Response.Cookies.Append("Jwt", _token.CreateToken(user), new CookieOptions() { HttpOnly = true });
                return new UserDto()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Department = user.Department.DepartmentID,
                    Title = user.Title,
                    Token = new TokenRespone() { Jwt = _token.CreateToken(user), RefreshToken = refreshToken.RefreshToken }
                };
            }

            return Unauthorized();

        }

        [HttpPost("register")]
        [AllowAnonymous]

        public async Task<ActionResult<UserDto>> Register(RegisterDto user)
        {
            var deparment = _db.Department.FirstOrDefault(d => d.DepartmentID == user.Department);

            var newUser = new AppUser()
            {
                UserName = user.UserName,
                Department = deparment,
                Email = user.Email,
                Title = user.Title,
                Role = "SampleEnter" //fix later
            };
            var result = await _userManager.CreateAsync(newUser, user.Password);

            if (result.Succeeded)
            {
                //   HttpContext.Response.Cookies.Append("Jwt", _token.CreateToken(newUser));
                return new UserDto()
                {
                    UserName = newUser.UserName,
                    Email = newUser.Email,
                    Department = user.Department,
                    Title = user.Title,
                    Token = new TokenRespone() { Jwt = _token.CreateToken(newUser), RefreshToken = _token.CreateRefreshToken().RefreshToken }
                };
            }
            string error = "";
            foreach (var item in result.Errors)
            {
                error += item.Description;
            }

            return BadRequest(error);

        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            if (User == null) return NotFound();
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _db.Users
            .Include(u => u.Token)
            .FirstOrDefaultAsync(u => u.Id == id);
            foreach (var token in user.Token)
            {
                _db.Token.Remove(token);
            }
            await _db.SaveChangesAsync();
            return Ok();

        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<ActionResult<UserDto>> RefreshToken([FromBody] TokenRespone tokenRes)
        {
            if (tokenRes.Jwt == null) return Unauthorized();
            var user = _token.GetIdentityFromToken(tokenRes.Jwt);
            if (user != null && _token.ValidateRefreshToken(user, tokenRes.RefreshToken))
            {
                //  var foundUser = _db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
                var refreshToken = _token.CreateRefreshToken();
                user.Token.Add(refreshToken);
                await _db.SaveChangesAsync();
                return new UserDto()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Department = user.Department.DepartmentID,
                    Title = user.Title,
                    Token = new TokenRespone() { Jwt = _token.CreateToken(user), RefreshToken = refreshToken.RefreshToken }
                };
            }
            return Unauthorized();

        }

        [HttpGet("myaccount")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            if (User == null) return NotFound();
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            await _db.Entry(user).Reference(d => d.Department).LoadAsync();


            if (user == null) return NotFound();

            return new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Department = user.Department.DepartmentID,
                Title = user.Title,
                Token = new TokenRespone() { Jwt = _token.CreateToken(user), RefreshToken = "" }
            };


        }

    }


}