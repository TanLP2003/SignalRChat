using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SignalRChat.Application.Utils;
using SignalRChat.Infrastructure.Models.Const;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Utils
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;
        public JwtService(IConfiguration configuration) 
        {
            _config = configuration;
        }
        public string GenerateAccessToken(Guid userId)
        {
            var secretKey = _config.GetSection("SecuritySetting")["SecretKey"];
            var encodedKey = Encoding.UTF8.GetBytes(secretKey);
            var symmetricKey = new SymmetricSecurityKey(encodedKey);
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString())
            };

            var tokenOpt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(Const.TIME_TO_LIVE),
                signingCredentials: new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256)
            );
            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOpt);
            return accessToken;
        }

        public Guid GetUserIdFromToken(string accessToken)
        {
            var secretKey = _config.GetSection("SecuritySetting")["SecretKey"];
            var encodedKey = Encoding.UTF8.GetBytes(secretKey);
            var symmetricKey = new SymmetricSecurityKey(encodedKey);
            var tokenValidationParam = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(encodedKey)
            };
            var principal = new JwtSecurityTokenHandler().ValidateToken(accessToken, tokenValidationParam, out SecurityToken securityToken);
            JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return Guid.Parse(principal.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
