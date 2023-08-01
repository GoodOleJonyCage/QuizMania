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
using Microsoft.EntityFrameworkCore;
using QuizMania.Models;
using System.Linq;

namespace QuizMania.Controllers
{
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        const string roleAdmin = "Admin";
        const string roleUser  = "User";

        private readonly IConfiguration _config;
        public UserController(IConfiguration config)
        {
            _config = config;
        }


        public Models.User Authenticate(Models.User user)
        {
            Models.User userFound = null;
            using (QuizMasterContext context = new QuizMasterContext())
            {
                userFound = context.User
                    .SingleOrDefault(u => u.Name == user.Name &&
                                          u.Password == user.Password);
            }
            return userFound;
        }

        [AllowAnonymous]
        [System.Web.Http.HttpPost]
        public ActionResult Login
            ([Microsoft.AspNetCore.Mvc.FromBody] System.Text.Json.JsonElement userParam)
        {
            var user = new Models.User() 
            { 
              Name = userParam.GetProperty("name").ToString(),
              Password = userParam.GetProperty("password").ToString()
            };
            var userLogged = Authenticate(user);
            if (userLogged != null)
            {
                var token = GenerateToken(userLogged);
                return Ok(token);
            }
            else
                return NotFound("User Not Found");
        }

        // To generate token
        private string GenerateToken(Models.User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Name),
                new Claim(ClaimTypes.Role,user.IsAdmin.Value ? roleAdmin : roleUser)
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
