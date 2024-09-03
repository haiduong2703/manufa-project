﻿using System.ComponentModel.DataAnnotations;

namespace Manufa.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(255)]
        public string AvatarUrl { get; set; }
        [StringLength(25)]
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
    }
}
