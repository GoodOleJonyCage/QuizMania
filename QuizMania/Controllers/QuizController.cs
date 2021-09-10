using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMania.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        //public ActionResult Index()
        //{
        //    return Ok("000875");
        //}

        public List<string> Get()
        {
            List<string> lst = new List<string>();
            for (int i = 0; i < 10; i++)
            {
                lst.Add(i.ToString());
            }
            return lst ;
        }
    }
}
