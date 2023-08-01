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
using System.Net.Mail;

namespace QuizMania.Controllers
{
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        const string roleAdmin = "Admin";
        const string roleUser  = "User";

        public UserController()
        {
        }

        private readonly IConfiguration _config;
        public UserController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [System.Web.Http.HttpPost]
        public ActionResult RegisterUser([Microsoft.AspNetCore.Mvc.FromBody] System.Text.Json.JsonElement userParams)
        {
            var user = new Models.User()
            {
                Name = userParams.GetProperty("name").ToString(),
                Password = userParams.GetProperty("password").ToString()
            };
            
            //validation
            if (string.IsNullOrEmpty(user.Name))
            {
                return BadRequest("Username required");
            }
            if (string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Password required");
            }

            //check for email validity
            try
            {
                MailAddress email = new MailAddress(user.Name);
            }
            catch (FormatException fe)
            {
                //Bad email
                return BadRequest("Username should be a valid email address");
            }

            if (UserExists(user))
            {
                return BadRequest("User already exists");
            }
            else
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    context.User.Add(user);
                    context.SaveChanges();
                }
                return Ok(true);
            }
        }

        public bool UserExists(Models.User user)
        {
            Models.User userFound = null;
            using (QuizMasterContext context = new QuizMasterContext())
            {
                userFound = context.User.SingleOrDefault(u => u.Name == user.Name);
            }
            return userFound != null;
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
            ([Microsoft.AspNetCore.Mvc.FromBody] System.Text.Json.JsonElement userParams)
        {
            var user = new Models.User() 
            { 
              Name = userParams.GetProperty("name").ToString(),
              Password = userParams.GetProperty("password").ToString()
            };
            //validation
            if (string.IsNullOrEmpty(user.Name))
            {
                return BadRequest("Username required");
            }
            if (string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Password required");
            }

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

        public int GetUserIDByName(string username)
        {
            int userID = 0;
            using (QuizMasterContext context = new QuizMasterContext())
            {
                userID = context.User
                            .Where(u => u.Name == username)
                            .Select(u => u.Id)
                            .SingleOrDefault();
                            
            }
            return userID;
        }
    }
}
