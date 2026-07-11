using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    /// <summary>
    /// Contexto do banco de dados da aplicação.
    /// Gerencia a conexão com o banco de dados SQLite e servirá como ponte para persistir as tabelas.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Tabela de pessoas
        public DbSet<Person> People => Set<Person>();

        // Tabela de transações
        public DbSet<Transaction> Transactions => Set<Transaction>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relacionamento com deleção em cascata
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Person)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PersonId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
