using Manufa.DTO;
using Manufa.Interface;
using Manufa.Models;
using System.Collections.Generic;
using System.Linq;

namespace Manufa.Services
{
    public class BodySizeComponentServices : IBodySizeComponentServices
    {
        private readonly MyDbContext _context;
        public BodySizeComponentServices(MyDbContext context)
        {
            _context = context;
        }
        public BodySizeResponeDTO CreateBodySize(BodySizeDTO body)
        {
            var newBodySize = new BodySizeComponent();
            newBodySize.Name = body.Name;
            newBodySize.Image = body.Image;
            newBodySize.TypeId = body.TypeId;
            _context.BodySizeComponent.Add(newBodySize);
            _context.SaveChanges();
            return new BodySizeResponeDTO
            {
                Id = newBodySize.Id,
                Status = true,
                Message = "Thêm chỉ số cơ thể thành công"
            };
        }

        public BodySizeResponeDTO DeleteBodySize(int id)
        {
            var bodySize = _context.BodySizeComponent.FirstOrDefault(x => x.Id == id);
            if(bodySize != null)
            {
                _context.BodySizeComponent.Remove(bodySize);
                _context.SaveChanges();
                return new BodySizeResponeDTO
                {
                    Id = id,
                    Status = true,
                    Message = "Xoá chỉ số cơ thể thành công"
                };
            }
            else
            {
                return new BodySizeResponeDTO
                {
                    Status = true,
                    Message = "Không có chỉ số này"
                };
            }
            
        }

        public List<BodySizeDTO> GetAllBodySize(int pageNumber, int pageSize)
        {
            var bodySizes = _context.BodySizeComponent
        .OrderBy(x => x.Id) 
        .Skip((pageNumber - 1) * pageSize) 
        .Take(pageSize) 
        .Select(x => new BodySizeDTO
        {
            Id = x.Id,
            Name = x.Name,
            Image = x.Image,
            TypeId = x.TypeId
        })
        .ToList();

            return bodySizes;
        }

        public BodySizeDTO GetBodySizeById(int id)
        {
            var bodySize = _context.BodySizeComponent
                                            .Where(x => x.Id == id)
                                            .Select(x => new BodySizeDTO
                                            {
                                                Id = x.Id,
                                                Name = x.Name,
                                                Image = x.Image,
                                                TypeId = x.TypeId
                                            })
                                            .FirstOrDefault(); 

                                                return bodySize;
                                            }

        public BodySizeResponeDTO UpdateBodySize(BodySizeDTO body)
        {
            var bodySize = _context.BodySizeComponent.FirstOrDefault(x => x.Id == body.Id);
            if(bodySize != null)
            {
                bodySize.Name = body.Name;
                bodySize.TypeId = body.TypeId;
                bodySize.Image = body.Image;
                _context.Update(bodySize);
                _context.SaveChanges();
                return new BodySizeResponeDTO
                {
                    Id = body.Id,
                    Status = true,
                    Message = "Cập nhật thành công"
                };
            }
            return new BodySizeResponeDTO
            {
                Status = true,
                Message = "Không tìm thấy"
            };
        }
    }
}
