using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public ILogger<DataContext> Log { get; }
        public DataContext(DbContextOptions opt, ILogger<DataContext> log) : base(opt)
        {
            Log = log;

        }

        public DbSet<Method> Method { get; set; }
        // public DbSet<JobSheet> JobSheet { get; set; }
        public DbSet<WorkSheet> WorkSheet { get; set; }
        public DbSet<Sample> Sample { get; set; }

        public DbSet<Token> Token { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<SampleMethodAssigment> SampleMethodAssigment { get; set; }

        public DbSet<Customer> Customer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                  => optionsBuilder.UseNpgsql();
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.HasSequence<int>("SampleNO").StartsAt(1);
            builder.HasSequence<int>("WorkSheetNO").StartsAt(1);

            builder.HasSequence<int>("ReceiveNO").StartsAt(1);

            builder.Entity<SampleMethodAssigment>()
            .HasKey(t => new { t.SampleID, t.MethodID });
            builder.Entity<SampleMethodAssigment>()
            .HasOne(a => a.Method)
            .WithMany(m => m.SampleMethodAssigments)
            .HasForeignKey(a => a.MethodID);

            // builder.Entity<JobSheet>()
            //     .Property(o => o.JobSheetNO)
            //     .HasDefaultValueSql("NEXT VALUE FOR JobSheetNO");

            // builder.Entity<WorkSheet>()
            //    .Property(o => o.WorkSheetSequence)
            //    .HasDefaultValueSql("nextval('\"WorkSheetNO\"')");
            // builder.Entity<WorkSheet>()
            //     .Property(o => o.ReceiveSequence)
            //     .HasDefaultValueSql("nextval('\"ReceiveNO\"')");

            builder.Entity<Sample>()
               .Property(o => o.SampleNo)
               .HasDefaultValueSql("nextval('\"SampleNO\"')");
            builder.Entity<Sample>().Property(s => s.Status).HasDefaultValue(0);
            builder.Entity<WorkSheet>().Property(s => s.Status).HasDefaultValue(0);
            builder.Entity<SampleMethodAssigment>()
            .HasOne(a => a.Sample)
            .WithMany(m => m.Paramaters)
            .HasForeignKey(a => a.SampleID);

            builder.Entity<WorkSheet>()
            .Property(s => s.WorkSheetNo)
            .UsePropertyAccessMode(PropertyAccessMode.Property);

        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            //.Max(t => t.WorkSheetSequence) + 1;

            // foreach (var entry in ChangeTracker.Entries())
            // {
            //     if (entry.Entity is WorkSheet workSheet)
            //     {
            //         if (entry.State == EntityState.Added)
            //         {



            //         }

            //     }
            // }

            return base.SaveChangesAsync(cancellationToken);
        }
    }

}