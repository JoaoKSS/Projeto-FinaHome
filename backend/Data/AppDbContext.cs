using Microsoft.EntityFrameworkCore;

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

    }
}
