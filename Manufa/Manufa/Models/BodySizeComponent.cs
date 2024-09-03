using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class BodySizeComponent
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        public int TypeId { get; set; }
        public virtual ComponentType ComponentType { get; set; }
    }
}
