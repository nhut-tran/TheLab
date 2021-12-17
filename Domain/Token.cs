using System;

namespace Domain
{
    public class Token
    {
        public int TokenID { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpireTime { get; set; }
        public AppUser User { get; set; }

    }
}