using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizMania.Migrations
{
    public partial class MyFirstMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>("IsCorrect", "QuizQuestionAnswer", "bit",
                unicode: false,   nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
