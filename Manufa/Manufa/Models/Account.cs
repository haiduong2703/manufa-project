using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [StringLength(25)]
        public string Username { get; set; }
        [StringLength(25)]
        public string Password { get; set; }
        // Navigation properties
        public virtual Admin Admin { get; set; }
        public virtual Manager Manager { get; set; }
        public virtual Staff Staff { get; set; }

    }
}
