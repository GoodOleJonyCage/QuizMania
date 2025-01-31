﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private void ResetQuizForUser(int UserID, int QuizId)
        {
            using (QuizMasterContext context = new QuizMasterContext())
            {
                context.QuizQuestionAnswered.RemoveRange(context.QuizQuestionAnswered.Where(a => a.UserId == 1 && a.QuizId == QuizId).ToList());
                context.SaveChanges();
            }
        }

        private int GetMaxQuizAttemptForUser(int UserID, int QuizId)
        {
            var maxValue = 0;
            using (QuizMasterContext context = new QuizMasterContext())
            {
                var maxAttemptVal = context.QuizQuestionAnswered.Where(q => q.QuizId == QuizId && q.UserId == UserID)
                                .Max(x => x.Attempt);

                maxValue = maxAttemptVal.HasValue ? maxAttemptVal.Value : 0  ;
            }
            return maxValue;
        }

        private int GetAttemptCountForUser(int UserID, int QuizId)
        {
            var maxValue = 0;
            using (QuizMasterContext context = new QuizMasterContext())
            {
                var numAttempts = context.QuizQuestionAnswered
                    .Where(q => q.QuizId == QuizId
                    && q.UserId == UserID)
                                  .Select(x => x.Attempt);
                maxValue = numAttempts.Max().HasValue ? numAttempts.Max().Value : 0;
            }
            return maxValue;
        }

        private static List<int> GetScoresForUser(int UserID, int QuizId)
        {
            List<int> lstScores = new List<int>();
            using (QuizMasterContext context = new QuizMasterContext())
            {
                var lstAttempts = context.QuizQuestionAnswered
                    .Where(q => q.QuizId == QuizId && q.UserId == UserID )
                                 .Select(x => x.Attempt)
                                 .ToList().Distinct();

                foreach (var attempt in lstAttempts)
                {
                    var quizQuestions =
                                  context.QuizQuestionAnswered
                                  .Where(q =>
                                  q.QuizId == QuizId &&
                                  q.UserId == UserID &&
                                  q.Attempt == attempt)
                                 .Select(x => x)
                                 .ToList();

                    var correctQAs = quizQuestions.Where(q => q.IsCorrect == true).ToList();
                    var correctSelectedQAs = quizQuestions.Where(q => q.IsCorrect == true && q.Selected == true).ToList();
                    decimal score = correctQAs.Count > 0 ?
                                     ((decimal)correctSelectedQAs.Count / (decimal)correctQAs.Count) * 100 : 0;

                    lstScores.Add((int)score);
                }
            }

            return lstScores;
        }

        public int GetTotalAttendies(int quizID)
        {
            var total = 0;
            using (QuizMasterContext context = new QuizMasterContext())
            {
                total = context.QuizQuestionAnswered
                           .Where(q => q.QuizId == quizID)
                           .Select(u => u.UserId)
                           .Distinct()
                           .Count();
            }
            return total;
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
            ViewModels.Quiz vm  = new ViewModels.Quiz();
            vm.ID               = Int32.Parse(questions.GetProperty("quizid").ToString());
            var questionlist = questions.GetProperty("questionlist");
            var username = questions.GetProperty("username").ToString();

            var userID = (new UserController()).GetUserIDByName(username);

            //ResetQuizForUser(1, vm.ID);
            var newAttempt = GetMaxQuizAttemptForUser(userID, vm.ID) + 1;

            vm.Questions        = JsonConvert.DeserializeObject<List<ViewModels.Question>>(questionlist.ToString());
            vm.Questions.ForEach(q =>
            {
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    q.Answers.ForEach(a =>
                    {
                        context.QuizQuestionAnswered.Add(new QuizQuestionAnswered()
                        {
                            UserId = userID,
                            QuizId = vm.ID,
                            QuestionId = q.QID,
                            AnswerId = a.AID,
                            Attempt = newAttempt,
                            Selected = a.Selected,
                            IsCorrect = a.AnsweredCorrectly
                        });
                    });
                    context.SaveChanges();
                }
            });

            return vm;
        }

        [HttpPost]
        [Route("savequiz")]
        public JsonVM SaveQuiz([FromBody] System.Text.Json.JsonElement param)
        {
            JsonVM vm = new JsonVM();
            ViewModels.Quiz quiz = new ViewModels.Quiz();
            
            try
            {
                #region creating vm 
                quiz.ID = Int32.Parse(param.GetProperty("id").ToString());
                quiz.Name = param.GetProperty("quizname").ToString();

                var list = param.GetProperty("questionanswers");
                for (int i = 0; i < list.GetArrayLength(); i++)
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
                            Name = answers[j].GetProperty("name").ToString(),
                            AnsweredCorrectly = answers[j].GetProperty("iscorrect").GetBoolean()
                        }); 
                    }

                    quiz.Questions.Add(new ViewModels.Question()
                    {
                        QID = id,
                        Name = name,
                        Answers = ansList
                    });
                }
                #endregion

                #region save quiz to db 
                using (QuizMasterContext context = new QuizMasterContext())
                {
                    var newquiz = new Quiz();
                    if (quiz.ID == 0)
                    {
                        newquiz.Name = quiz.Name;
                        context.Quiz.Add(newquiz);
                        context.SaveChanges();
                    }
                    else //clearing quiz question and answers
                    {
                        newquiz.Id = quiz.ID;
                        var lstToRemove = context.QuizQuestionAnswer.Where(x => x.QuizId == newquiz.Id).ToList();
                        context.QuizQuestionAnswer.RemoveRange(lstToRemove);
                        context.SaveChanges();
                    }

                  
                    quiz.Questions.ForEach(q =>
                    {
                        var questionAdded = context.Question.Add(new Question() { Name = q.Name });
                        context.SaveChanges();
                        q.Answers.ForEach(a =>
                        {
                            var ansAdded = context.Answer.Add(new Answer() {  Name = a.Name });
                            context.SaveChanges();
                            context.QuizQuestionAnswer.Add(new QuizQuestionAnswer()
                            {
                                QuizId = newquiz.Id,
                                QuestionId = questionAdded.Entity.Id,
                                AnswerId = ansAdded.Entity.Id,
                                IsCorrect = a.AnsweredCorrectly
                            });
                        });
                    });
                    context.SaveChanges();
                }
                #endregion 
            }
            catch (Exception exc)
            {
                vm.Errored = true;
                vm.Message = exc.Message;
            }
            return vm;
        }

        [Authorize]
        [HttpPost]
        [Route("quizes")]
        public ActionResult Quizes([FromBody] System.Text.Json.JsonElement param)
        {
            var username = param.GetProperty("username").ToString();
            var userID = (new UserController()).GetUserIDByName(username);
            List<ViewModels.Quiz> vm = RetreiveQuizDetails(userID);
            return Ok(vm);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("adminquizes")]
        public ActionResult AdminQuizes()
        {
            //sp implementation
            var lst = new List<GetQuizSummary_Result>();
            using (QuizMasterContext context = new QuizMasterContext())
            {
                lst = context.Set<GetQuizSummary_Result>().FromSqlRaw("EXEC sp_GetQuizSummary").ToList();
            }
            return Ok(lst);
        }

        [Authorize]
        [HttpPost]
        [Route("scoreboard")]
        public ActionResult ScoreBoard([FromBody] System.Text.Json.JsonElement param)
        {
            var username = param.GetProperty("username").ToString();
            var userID = (new UserController()).GetUserIDByName(username);
            List<ViewModels.Quiz> vm = RetreiveQuizDetails(userID);
            vm.ForEach(quiz =>
            {
                quiz.AttemptDetails = quiz.Attempts > 0 ? RetreiveAttemptDetails(quiz.ID, userID) : null;
            });
            return Ok(vm);
        }

        public List<ViewModels.Attempt> RetreiveAttemptDetails(int quizID, int userID)
        {
            var attempts = new List<ViewModels.Attempt> ();
            using (QuizMasterContext context = new QuizMasterContext() )
            {
                var lstGroup = context.QuizQuestionAnswered
                                        .Where(entry => entry.QuizId == quizID && 
                                                        entry.UserId == userID)
                                        .Select( row => row)
                                        .ToList();

                var lstAttempts = lstGroup.DistinctBy(row => row.Attempt).ToList();

                lstAttempts.ForEach(attempt =>
                {
                    var lstAttempt = lstGroup.Where(e => e.Attempt == attempt.Attempt).ToList();
                    var lstQuestions = lstAttempt.DistinctBy(q => q.QuestionId).ToList();
                    var correct = lstQuestions.Where(question => question.IsCorrect.Value == true && question.Selected.Value == true).Count();
                    decimal total = lstQuestions.Count();
                    int score = (int)((correct / total) * 100);
                    var dateTaken = attempt.DateEntered.Value;
                    attempts.Add(new ViewModels.Attempt()
                    {
                        AttemptNum = attempt.Attempt.Value,
                        Score = score,
                        Correct = correct,
                        Date = dateTaken
                    });
                });
            }
            return attempts; 
        }

        [Authorize]
        [HttpPost]
        [Route("quizdetails")]
        public ActionResult Get([FromBody] System.Text.Json.JsonElement param)
        {
            //return Unauthorized("sss");
            ViewModels.Quiz vm = new ViewModels.Quiz();
            vm.ID = Int32.Parse(param.GetProperty("quizid").ToString());
            using (QuizMasterContext context = new QuizMasterContext())
            {
                vm = (from q in context.Quiz
                      where q.Id == vm.ID
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
                                 qqa.QuestionId == q.QID &&
                                 qz.Id == vm.ID
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
            return Ok(vm);

        }

        private List<ViewModels.Quiz> RetreiveQuizDetails(int  userID)
        {
            var vm = new List<ViewModels.Quiz>();
            using (QuizMasterContext context = new QuizMasterContext())
            {
                context.Quiz.ToList().ForEach(q =>
                {
                    var quizQuestions = (from qt in context.Question
                                         join qa in context.QuizQuestionAnswer
                                          on qt.Id equals qa.QuestionId
                                         where qa.QuizId == q.Id
                                         select new ViewModels.Question
                                         {
                                             QID = qt.Id,
                                             Answers = (from a in context.Answer
                                                        join qa in context.QuizQuestionAnswer
                                                        on a.Id equals qa.AnswerId
                                                        where qa.QuizId == q.Id && qa.QuestionId == qt.Id
                                                        select new ViewModels.Answer { AID = a.Id })
                                                        .Distinct()
                                                        .ToList()
                                         })
                                         .Distinct()
                                         .ToList();

                    var lstScores = GetScoresForUser(userID, q.Id);
                    vm.Add(new ViewModels.Quiz()
                    {
                        ID = q.Id,
                        Name = q.Name,
                        Questions = quizQuestions,
                        BestScore = lstScores.Count > 0 ? lstScores.Max() : 0,
                        AverageScore = lstScores.Count > 0 ? (int)lstScores.Average() : 0,
                        //Attendies = GetTotalAttendies(q.Id),
                        Attempts = GetAttemptCountForUser(userID, q.Id)
                    });
                });
            }
            return vm;
        }
        
    }
}
