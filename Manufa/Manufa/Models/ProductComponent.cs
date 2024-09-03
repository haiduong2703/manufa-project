using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class ProductComponent
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
     
        public int TypeId { get; set; }
        public virtual ComponentType ComponentType { get; set; }
    }
}
