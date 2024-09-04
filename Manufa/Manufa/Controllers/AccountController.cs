using Manufa.DTO;
using Manufa.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;

namespace Manufa.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountServices _service;
        public AccountController(IAccountServices service)
        {
            _service = service;
        }
        [HttpPost()]
        public async Task<IActionResult> SaveFileUrl([FromBody] FileUploadDTO fileUploadDto)
        {
            if (string.IsNullOrEmpty(fileUploadDto.FileUrl))
            {
                return BadRequest("File URL is required");
            }

            var fileUrl = fileUploadDto.FileUrl;

            return Ok("File URL saved successfully");
        }
        [HttpGet]
        public IActionResult GetUserByLogin(string name, string password)
        {
            return Ok(_service.GetUserByLogin(name, password));
        }
        [HttpPost]
        public IActionResult CreateUser(AccountCreateDTO user)
        {
            return Ok(_service.CreateUserStaff(user));
        }
        [HttpPost]
        public IActionResult UpdateUser(int accountId, AccountUpdateDTO user)
        {
            return Ok(_service.UpdateUserStaff(accountId, user));
        }
        [HttpGet]
        public IActionResult GetAllUser()
        {
            return Ok(_service.GetAllAccountStaff());
        }
        [HttpGet]
        public IActionResult GetStaffById(int Id)
        {
            return Ok(_service.GetAccountStaffById(Id));
        }
        [HttpPost]
        public IActionResult ChangeStatusStaff(int Id, bool IsActive)
        {
            return Ok(_service.ChangeStatusStaff(Id, IsActive));
        }
        [HttpDelete]
        public IActionResult DeletedStaffById(int id)
        {
            return Ok(_service.DeletedStaffById(id));
        }
    }
}
