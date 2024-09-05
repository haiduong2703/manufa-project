using Microsoft.EntityFrameworkCore;
namespace Manufa.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public DbSet<Account> Account { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<BodySizeComponent> BodySizeComponent { get; set; }
        public DbSet<ComponentType> ComponentType { get; set; }
        public DbSet<Manager> Manager { get; set; }
        public DbSet<ProductComponent> ProductComponent { get; set; }
        public DbSet<Staff> Staff { get; set; }

        public DbSet<MaterialType> MaterialType { get; set; }
        public DbSet<Material> Material { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
            .HasOne(a => a.Admin)
            .WithOne(ad => ad.Account)
            .HasForeignKey<Admin>(ad => ad.AccountId);

            // 1-1 relationship between Account and Manager
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Manager)
                .WithOne(m => m.Account)
                .HasForeignKey<Manager>(m => m.AccountId);

            // 1-1 relationship between Account and Staff
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Staff)
                .WithOne(s => s.Account)
                .HasForeignKey<Staff>(s => s.AccountId);
            modelBuilder.Entity<ComponentType>(e =>
            {
                e.HasMany(x => x.ProductComponents).WithOne(x => x.ComponentType).HasForeignKey(x => x.TypeId);
                e.HasMany(x => x.BodySizeComponents).WithOne(x => x.ComponentType).HasForeignKey(x => x.TypeId);
            });
            modelBuilder.Entity<MaterialType>(e =>
            {
                e.HasMany(x => x.Materials).WithOne(x => x.MaterialType).HasForeignKey(x => x.TypeId);
            });

        }


    }
}
