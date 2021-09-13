﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace QuizMania.Models
{
    public partial class QuizQuestionAnswer
    {
        public QuizQuestionAnswer()
        {
            QuizQuestionAnswered = new HashSet<QuizQuestionAnswered>();
        }

        public int Id { get; set; }
        public int? QuizId { get; set; }
        public int? QuestionId { get; set; }
        public int? AnswerId { get; set; }
        public bool? IsCorrect { get; set; }

        public virtual Answer Answer { get; set; }
        public virtual Question Question { get; set; }
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<QuizQuestionAnswered> QuizQuestionAnswered { get; set; }
    }
}
