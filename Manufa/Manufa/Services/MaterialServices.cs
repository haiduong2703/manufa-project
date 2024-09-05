using Manufa.DTO;
using Manufa.Interface;
using Manufa.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Manufa.Services
{
    public class MaterialServices : IMaterialServices
    {
        private readonly MyDbContext _context;
        public MaterialServices(MyDbContext context)
        {
            _context = context;
        }
        public List<MaterialDTO> GetAllMaterial()
        {
            var query = _context.Material
                         .Join(_context.MaterialType,
                               material => material.TypeId,
                               materialType => materialType.Id,
                               (material, materialType) => new MaterialDTO
                               {
                                   
                                   Name = material.Name,
                                   ImageUrl = material.ImageUrl,
                                   UnitPrice = material.UnitPrice,

                               })
                         
                         .ToList();

            return query;
        }
    }
}
