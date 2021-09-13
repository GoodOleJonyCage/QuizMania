using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuizMania.Models;
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

        public ViewModels.Quiz Get()
        {
            ViewModels.Quiz vm = new ViewModels.Quiz();

            using (QuizMasterContext context = new QuizMasterContext())
            {

                vm = (from q in context.Quiz
                      where q.Id == 1
                      select new ViewModels.Quiz()
                      {
                          ID = q.Id,
                          Name = q.Name
                      }).SingleOrDefault();


                var questions = (from qqa in context.QuizQuestionAnswer
                                 join qz in context.Quiz on qqa.QuizId equals qz.Id
                                 join q in context.Question on qqa.QuestionId equals q.Id
                                 where qz.Id == vm.ID
                                 select new ViewModels.Question()
                                 {
                                     QID = q.Id,
                                     Name = q.Name,
                                     Active = false,
                                     Message = string.Empty
                                 }).Distinct().ToList();

                questions.ForEach(q =>
                {
                    q.Answers = (from qqa in context.QuizQuestionAnswer
                                 join qz in context.Quiz on qqa.QuizId equals qz.Id
                                 join a in context.Answer on qqa.AnswerId equals a.Id
                                 where
                                 qqa.QuestionId == q.QID
                                 select new ViewModels.Answer()
                                 {
                                     AID = a.Id,
                                     Name = a.Name,
                                     Selected = false,
                                     AnsweredCorrectly = qqa.IsCorrect.HasValue ? qqa.IsCorrect.Value: false
                                 }).ToList();

                    vm.Questions = questions;

                });
            }

            return vm;
        }
    }
}
