using Manufa.DTO;
using Manufa.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Manufa.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BodySizeComponentController : ControllerBase
    {
        private readonly IBodySizeComponentServices _service;
        public BodySizeComponentController(IBodySizeComponentServices service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult CreateBodySize(BodySizeDTO body)
        {
            return Ok(_service.CreateBodySize(body));
        }
        [HttpPut]
        public IActionResult UpdateBodySize(BodySizeDTO body)
        {
            return Ok(_service.UpdateBodySize(body));
        }

        [HttpDelete]
        public IActionResult DeleteBodySize(int id)
        {
            return Ok(_service.DeleteBodySize(id));
        }

        [HttpGet]
        public IActionResult GetAllBodySize(int pageNumber, int pageSize)
        {
            return Ok(_service.GetAllBodySize(pageNumber, pageSize));
        }
        [HttpGet]
        public IActionResult GetBodySizeById(int id)
        {
            return Ok(_service.GetBodySizeById(id));
        }
    }
}
