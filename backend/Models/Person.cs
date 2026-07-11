namespace Backend.Models
{
    public class Person
    {
        // Identificador unico gerado automaticamente pelo banco
        public int Id { get; set; }

        // Nome da pessoa
        public string Name { get; set; } = string.Empty;

        // Idade
        public int Age { get; set; }
    }
}
