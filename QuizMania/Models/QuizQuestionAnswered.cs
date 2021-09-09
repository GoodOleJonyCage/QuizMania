using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace QuizMania.Models
{
    public partial class QuizQuestionAnswered
    {
        public int Id { get; set; }
        public int? QuizQuestionAnswerId { get; set; }
        public int? UserId { get; set; }

        public virtual QuizQuestionAnswer QuizQuestionAnswer { get; set; }
        public virtual User User { get; set; }
    }
}
