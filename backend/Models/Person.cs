namespace Backend.Models
{
    public class Person
    {
        // Identificador unico
        public int Id { get; set; }

        // Nome da pessoa
        public string Name { get; set; } = string.Empty;

        // Idade
        public int Age { get; set; }

        // Transações vinculadas a pessoa
        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
