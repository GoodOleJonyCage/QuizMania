using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using QuizMania.Helper;
using QuizMania.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
 

namespace QuizMania.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private void ResetQuizForUser(int UserID, int QuizId)
        {
            using (QuizMasterContext context = new QuizMasterContext())
            {
                context.QuizQuestionAnswered.RemoveRange(context.QuizQuestionAnswered.Where(a => a.UserId == 1 && a.QuizId == 1).ToList());
                context.SaveChanges();
            }
        }

       
        [Route("editquestion")]
        public JsonVM EditQuestion([FromBody] System.Text.Json.JsonElement obj)
        {
            JsonVM vm = new JsonVM();

            int id = obj.GetProperty("id").GetInt32();  
            string name = obj.GetProperty("name").GetString();

            if (string.IsNullOrEmpty(name.Trim()))
            {
                vm.Message = "Value Required";
                vm.Errored = true;
            }
            else
            {
                try
                {
                    using (QuizMasterContext context = new QuizMasterContext())
                    {
                        var question = context.Question.Where(q => q.Id == id).SingleOrDefault();
                        question.Name = name;
                        context.SaveChanges();
                    }
                }
                catch (Exception exc)
                {
                    vm.Message = exc.Message;
                    vm.Errored = true;
                }
            }
            return vm;
        }


        [Route("editanswer")]
        public JsonVM EditAnswer([FromBody] System.Text.Json.JsonElement obj)
        {
            JsonVM vm = new JsonVM();

            int id = obj.GetProperty("id").GetInt32(); 
            string name = obj.GetProperty("name").GetString();
            if (string.IsNullOrEmpty(name.Trim()))
            {
                vm.Message = "Value Required";
                vm.Errored = true;
            }
            else
            {
                try
                {
                    using (QuizMasterContext context = new QuizMasterContext())
                    {
                        var answer = context.Answer.Where(a => a.Id == id).SingleOrDefault();
                        answer.Name = name;
                        context.SaveChanges();
                    }
                }
                catch (Exception exc)
                {
                    vm.Message = exc.Message;
                    vm.Errored = true;
                }
            }
            return vm;
             
        }

        [Route("questions")]
        public List<Question> GetQuestions()
        {
            List<Question> lst = new List<Question>();
            try
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    lst.AddRange(context.Question.ToList());
                }
            }
            catch (Exception exc)
            {
                
            }
            return lst;
        }

        [Route("answers")]
        public List<Answer> GetAnswers()
        {
            List<Answer> lst = new List<Answer>();
            try
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    lst.AddRange(context.Answer.ToList());
                }
            }
            catch (Exception exc)
            {

            }
            return lst;
        }

        [Route("addquestion")]
        [HttpPost]
        public string AddQuestion([FromBody] System.Text.Json.JsonElement question)
        {
            string message = string.Empty;
            string questionText = question.GetProperty("question").GetString();
            try
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    context.Question.Add(new Question()
                    {
                        Name = questionText
                    });
                    context.SaveChanges();
                }
            }
            catch (Exception exc)
            {
                message = exc.Message;
            }
            return message;
        }
        
        [Route("addanswer")]
        [HttpPost]
        public string AddAnswer([FromBody] System.Text.Json.JsonElement answer)
        {
            string message = string.Empty;
            string answerText = answer.GetProperty("answer").GetString();
            try
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    context.Answer.Add(new Answer()
                    {
                        Name = answerText
                    });
                    context.SaveChanges();
                }
            }
            catch (Exception exc)
            {
                message = exc.Message;
            }
            return message;
        }

        [Route("submitquiz")]
        public ViewModels.Quiz SubmitQuiz([FromBody] System.Text.Json.JsonElement questions)
        {
            ResetQuizForUser(1,1);
           
            ViewModels.Quiz vm  = new ViewModels.Quiz();
            var questionlist    = questions.GetProperty("questionlist");
            vm.Questions        = JsonConvert.DeserializeObject<List<ViewModels.Question>>(questionlist.ToString());
            vm.Questions.ForEach(q =>
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    context.QuizQuestionAnswered.Add(new QuizQuestionAnswered()
                    {
                        UserId      = 1,
                        QuizId      = 1,
                        QuestionId  = q.QID,
                        IsCorrect   = q.Answers.Where( a => a.Selected && a.AnsweredCorrectly ).SingleOrDefault() != null 
                    });

                    context.SaveChanges();
                }
            });
            
            return vm;
        }

        [HttpPost]
        [Route("savequiz")]
        public JsonVM SaveQuiz([FromBody] System.Text.Json.JsonElement questionanswers)
        {
            JsonVM vm = new JsonVM();

            ViewModels.Quiz quiz = new ViewModels.Quiz();

            var list = questionanswers.GetProperty("questionanswers");
            for (int i = 0; i < list.GetArrayLength() ; i++)
            {
                var id = Int32.Parse(list[i].GetProperty("id").ToString());
                var name = list[i].GetProperty("name").ToString();
                var answers = list[i].GetProperty("answers");

                List<ViewModels.Answer> ansList = new List<ViewModels.Answer>();
                for (int j = 0; j < answers.GetArrayLength(); j++)
                {
                    ansList.Add(new ViewModels.Answer()
                    {
                        AID = Int32.Parse(answers[j].GetProperty("id").ToString()),
                        Name = answers[j].GetProperty("name").ToString()
                    });
                }

                quiz.Questions.Add(new ViewModels.Question()
                {
                    QID = id,
                    Name = name,
                    Answers = ansList
                });
            }
            //save quiz to db and send result back 

            return vm;
        }

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
                                     AnsweredCorrectly = qqa.IsCorrect.HasValue ? qqa.IsCorrect.Value : false
                                 }).ToList();

                    vm.Questions = questions;

                });

            }

            return vm;
        }
    }
}
