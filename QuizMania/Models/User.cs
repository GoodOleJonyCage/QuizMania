using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace QuizMania.Models
{
    public partial class User
    {
        public User()
        {
            QuizQuestionAnswered = new HashSet<QuizQuestionAnswered>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public bool? IsAdmin { get; set; }

        public virtual ICollection<QuizQuestionAnswered> QuizQuestionAnswered { get; set; }
    }
}
