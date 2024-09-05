using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class MaterialType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Material> Materials { get; set; }
    }
}
