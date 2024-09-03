using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class ComponentType
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        public ICollection<BodySizeComponent> BodySizeComponents {  get; set; }
        public ICollection<ProductComponent> ProductComponents {  get; set; }

    }
}
