using Manufa.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manufa.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialServices _service;
        public MaterialController(IMaterialServices service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAllMaterial()
        {
            return Ok(_service.GetAllMaterial());
        }
    }
}
