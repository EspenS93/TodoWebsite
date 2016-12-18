using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.User;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("/api/[Controller]")]
    public class UserController : Controller
    {
        public UserController(WebsiteDbContext context)
        {
            Users = context;
        }
        public WebsiteDbContext Users;

        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return Users.Set<User>();
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetUser(string id)
        {
            var user = Users.Set<User>().Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            Users.Users.Add(user);
            Users.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var user = Users.Set<User>().Find(id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                Users.Users.Remove(user);
                Users.SaveChanges();
                return new NoContentResult();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] User newUser)
        {
            if (newUser == null || newUser.id != id)
            {
                return BadRequest();
            }

            var user = Users.Set<User>().Where(t => id == t.id);
            if (user == null)
            {
                return NotFound();
            }

            Users.Update(newUser);
            Users.SaveChanges();
            return new NoContentResult();
        }
    }

}
