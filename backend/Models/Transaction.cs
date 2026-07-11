using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionType
    {
        Receita,
        Despesa
    }

    /// <summary>
    /// Entidade que representa uma transação associada a uma pessoa.
    /// </summary>
    public class Transaction
    {
        // Identificador único
        public int Id { get; set; }

        // Descrição da transação
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        public string Description { get; set; } = string.Empty;

        // Valor financeiro da transação
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal Value { get; set; }

        // Tipo da transação
        [Required(ErrorMessage = "O tipo da transação é obrigatório.")]
        public TransactionType Type { get; set; }

        // Chave estrangeira para a pessoa
        [Required(ErrorMessage = "O identificador da pessoa é obrigatório.")]
        public int PersonId { get; set; }

        // Propriedade de navegação para a entidade Person
        [JsonIgnore]
        public Person? Person { get; set; }
    }
}
