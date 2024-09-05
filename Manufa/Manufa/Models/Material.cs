using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class Material
    {
        [Key]

        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        public double UnitPrice { get; set; }
        [StringLength(500)]
        public string ImageUrl { get; set; }
        public int TypeId { get; set; }
        public virtual MaterialType MaterialType { get; set; }
    }
}
