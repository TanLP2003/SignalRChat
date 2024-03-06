using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SignalRChat.Core.Entites;
using SignalRChat.Infrastructure.Models;
using SignalRChat.Infrastructure.Models.Enums;

namespace SignalRChat.Infrastructure.Data
{
    public class DataContext : IdentityDbContext<UserModel, IdentityRole<Guid>, Guid>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) 
        { 
            
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserModel>()
                .HasIndex(u => u.Email)
                .IsUnique();
            builder.Entity<UserModel>().HasData(
                new UserModel
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Sam",
                    LastName = "Smith",
                    Email = "samsmith@gmail.com",
                    UserName = "Sam",
                    PhoneNumber = "0981267345",
                    Avatar = "https://res.cloudinary.com/dumhujhqd/image/upload/v1708702834/SignalR/yw99zs33p8ehuk3ywhzc.png"
                },
                new UserModel
                {
                    Id = Guid.NewGuid(),
                    FirstName = "John",
                    LastName = "H.Watson",
                    Email = "johnwatson@gmail.com",
                    UserName = "John",
                    PhoneNumber = "0912348954",
                    Avatar = "https://res.cloudinary.com/dumhujhqd/image/upload/v1708702834/SignalR/yw99zs33p8ehuk3ywhzc.png"
                }
            );
            builder.Entity<MessageModel>()
               .HasOne(m => m.Sender)
               .WithMany()
               .HasForeignKey(m => m.SenderId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<MessageModel>()
                .HasOne(m => m.Receiver)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MessageModel>()
                .Property(m => m.Type)
                .HasConversion(
                    v => v.ToString(),
                    v => (FileType)Enum.Parse(typeof(FileType), v)
                );
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<RefreshTokenModel> RefreshTokens { get; set; }
        public DbSet<MessageModel> Messages { get; set; }
    }
}
