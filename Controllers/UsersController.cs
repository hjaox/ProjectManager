using Microsoft.AspNetCore.Mvc;
using ProjectManager.Interfaces;
using ProjectManager.Models;

namespace ProjectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("Id:int")]
        public IActionResult GetUser(int Id)
        {
            var user = _userRepository.GetUser(Id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var user = _userRepository.GetAllUsers();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }
    }
}
