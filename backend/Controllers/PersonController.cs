using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/person")]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonController(AppDbContext context)
        {
            _context = context;
        }

        // Busca todas as pessoas salvas no banco
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            var people = await _context.People.ToListAsync();
            return Ok(people);
        }

        // Cadastra uma nova pessoa no banco
        [HttpPost]
        public async Task<ActionResult<Person>> CreatePerson([FromBody] Person person)
        {
            if (string.IsNullOrWhiteSpace(person.Name))
            {
                return BadRequest("O nome nao pode ser vazio.");
            }

            if (person.Age < 0)
            {
                return BadRequest("A idade nao pode ser menor que zero.");
            }

            _context.People.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPeople), new { id = person.Id }, person);
        }

        // Atualiza os dados de uma pessoa
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePerson(int id, [FromBody] Person updatedPerson)
        {
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound("Pessoa nao encontrada.");
            }

            if (string.IsNullOrWhiteSpace(updatedPerson.Name))
            {
                return BadRequest("O nome nao pode ser vazio.");
            }

            if (updatedPerson.Age < 0)
            {
                return BadRequest("A idade nao pode ser menor que zero.");
            }

            person.Name = updatedPerson.Name;
            person.Age = updatedPerson.Age;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Deleta uma pessoa com base no id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound("Pessoa nao encontrada.");
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
