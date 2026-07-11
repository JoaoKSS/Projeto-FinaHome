using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        // Listagem de todas as transações cadastradas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions);
        }

        // Criação de uma nova transação
        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction transaction)
        {
            
            // Verifica se a pessoa informada existe
            var person = await _context.People.FindAsync(transaction.PersonId);
            if (person == null)
            {
                return NotFound("Pessoa não encontrada.");
            }

            // Regra de Negocio: Se for menor de idade apenas despesas são permitidas
            if (person.Age < 18 && transaction.Type == TransactionType.Receita)
            {
                return BadRequest("Apenas despesas podem ser cadastradas para menores de 18 anos.");
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactions), new { id = transaction.Id }, transaction);
        }
    }
}
