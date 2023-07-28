using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Web.Http;
using Microsoft.Extensions.Configuration;
using System.Net;
using Microsoft.AspNetCore.Identity;

namespace QuizMania.Controllers
{
    [AllowAnonymous]
    public class UserController : ControllerBase
    {

        private readonly IConfiguration _config;
        public UserController(IConfiguration config)
        {
            _config = config;
        }


        public bool Authenticate(Models.User user)
        {
            return user.Name == "himan_sa@yahoo.com" ;
        }

        [AllowAnonymous]
        [System.Web.Http.HttpPost]
        public ActionResult Login
            ([Microsoft.AspNetCore.Mvc.FromBody] System.Text.Json.JsonElement userParam)
        {
            var user = new Models.User() 
            { 
              Name = userParam.GetProperty("name").ToString()
            };
            if (Authenticate(user))
            {
                var token = GenerateToken(user.Name);
                return Ok(token);
            }
            else
                return NotFound("User Not Found (server side)");
            //find a way to pass this message to client
        }

        // To generate token
        private string GenerateToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,username),
                new Claim(ClaimTypes.Role,"admin")
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_config["Timeout"])),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
