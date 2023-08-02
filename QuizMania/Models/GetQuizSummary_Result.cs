using QuizMania.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace QuizMania.Models
{
    public class GetQuizSummary_Result
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public int QuestionCount { get; set; }
        public int AnswerCount { get; set; }
        public int Attempts { get; set; }
        public int Attendies { get; set; }
        public decimal AverageScore { get; set; }
        public decimal BestScore { get; set; }
    }
}
