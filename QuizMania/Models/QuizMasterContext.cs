using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace QuizMania.Models
{
    public partial class QuizMasterContext : DbContext
    {
        public QuizMasterContext()
        {
        }

        public QuizMasterContext(DbContextOptions<QuizMasterContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answer> Answer { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Quiz> Quiz { get; set; }
        public virtual DbSet<QuizQuestionAnswer> QuizQuestionAnswer { get; set; }
        public virtual DbSet<QuizQuestionAnswered> QuizQuestionAnswered { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-HJJ87HE\\SQLEXPRESS;Database=QuizMaster;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Quiz>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<QuizQuestionAnswer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AnswerId).HasColumnName("AnswerID");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.QuizId).HasColumnName("QuizID");

                entity.HasOne(d => d.Answer)
                    .WithMany(p => p.QuizQuestionAnswer)
                    .HasForeignKey(d => d.AnswerId)
                    .HasConstraintName("FK_QuizQuestionAnswer_Answer");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuizQuestionAnswer)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK_QuizQuestionAnswer_Question");

                entity.HasOne(d => d.Quiz)
                    .WithMany(p => p.QuizQuestionAnswer)
                    .HasForeignKey(d => d.QuizId)
                    .HasConstraintName("FK_QuizQuestionAnswer_Quiz");
            });

            modelBuilder.Entity<QuizQuestionAnswered>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.QuizQuestionAnswerId).HasColumnName("QuizQuestionAnswerID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.QuizQuestionAnswer)
                    .WithMany(p => p.QuizQuestionAnswered)
                    .HasForeignKey(d => d.QuizQuestionAnswerId)
                    .HasConstraintName("FK_QuizQuestionAnswered_QuizQuestionAnswer");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.QuizQuestionAnswered)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_QuizQuestionAnswered_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
