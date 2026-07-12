using System.Linq;
using Backend.Models;

namespace Backend.Data
{
    public static class DbSeeder
    {
        /// <summary>
        /// Popula o banco de dados de forma idempotente, inserindo apenas novos registros.
        /// </summary>
        public static void Seed(AppDbContext context)
        {
            // Participantes a serem semeados
            var seedPeople = new[]
            {
                new Person { Name = "João Kennedy", Age = 25 },
                new Person { Name = "Maria Eduarda", Age = 17 }, // Menor de idade
                new Person { Name = "Carlos Silva", Age = 42 }
            };

            foreach (var sp in seedPeople)
            {
                // Procura participante existente pelo nome evitando duplicados
                var existingPerson = context.People.FirstOrDefault(p => p.Name == sp.Name);
                if (existingPerson == null)
                {
                    context.People.Add(sp);
                    context.SaveChanges(); // id autoincrementado
                }
                else
                {
                    // Obtem o Id existente para vincular transações
                    sp.Id = existingPerson.Id;
                    
                    // Sincroniza idade se houver alteração
                    if (existingPerson.Age != sp.Age)
                    {
                        existingPerson.Age = sp.Age;
                        context.SaveChanges();
                    }
                }
            }

            // ID das pessoas
            var joaoId = seedPeople.First(p => p.Name == "João Kennedy").Id;
            var mariaId = seedPeople.First(p => p.Name == "Maria Eduarda").Id;
            var carlosId = seedPeople.First(p => p.Name == "Carlos Silva").Id;

            // Transaçoes a serem semeadas
            var seedTransactions = new[]
            {
                // João (Adulto)
                new Transaction { Description = "Salário Mensal", Value = 5500.00m, Type = TransactionType.Receita, PersonId = joaoId },
                new Transaction { Description = "Aluguel", Value = 1200.00m, Type = TransactionType.Despesa, PersonId = joaoId },
                new Transaction { Description = "Supermercado", Value = 450.00m, Type = TransactionType.Despesa, PersonId = joaoId },

                // Maria (Menor de idade - apenas despesas)
                new Transaction { Description = "Curso de Inglês", Value = 250.00m, Type = TransactionType.Despesa, PersonId = mariaId },
                new Transaction { Description = "Transporte", Value = 80.00m, Type = TransactionType.Despesa, PersonId = mariaId },

                // Carlos (Adulto)
                new Transaction { Description = "Venda de Notebook Usado", Value = 1800.00m, Type = TransactionType.Receita, PersonId = carlosId },
                new Transaction { Description = "Manutenção do Carro", Value = 650.00m, Type = TransactionType.Despesa, PersonId = carlosId }
            };

            foreach (var st in seedTransactions)
            {
                // Evita inserções duplicadas verificando assinatura identica de transação
                var exists = context.Transactions.Any(t =>
                    t.Description == st.Description &&
                    t.Value == st.Value &&
                    t.Type == st.Type &&
                    t.PersonId == st.PersonId);

                if (!exists)
                {
                    context.Transactions.Add(st);
                }
            }

            context.SaveChanges();
        }
    }
}
