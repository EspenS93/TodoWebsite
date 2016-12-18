using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.Todo;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("/api/[controller]")]
    public class TodoController : Controller
    {
        public WebsiteDbContext Todos;

        public TodoController(WebsiteDbContext context)
        {
            Todos = context;
        }

        [HttpGet, Route("getAll")]
        public IEnumerable<Todo> GetAll()
        {
            return Todos.Set<Todo>();
        }
        [HttpGet("users/{id}")]
        public IEnumerable<Todo> GetAllForUser(string id)
        {
            return Todos.Todos.Where(t => id ==t.userID);
        }

        [HttpGet("gettodo/{id}")]
        public IActionResult GetTodo(string id)
        {
            var todo = Todos.Set<Todo>().Where(t => id == t.id);
            if (todo == null)
            {
                return NotFound();
            }
            return new ObjectResult(todo);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Todo todo)
        {
            if (todo == null)
            {
                return BadRequest();
            }
            Todos.Todos.Add(todo);
            return Ok();
        }
        /*[HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var todo = Todos.Set<Todo>().Where(t => id == t.id);
            if (todo == null)
            {
                return NotFound();
            }
            else
            {
                Todos.Todos.Remove(todo);
                return new NoContentResult();
            }
        }*/

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Todo newTodo)
        {
            if (newTodo == null || newTodo.id != id)
            {
                return BadRequest();
            }

            var todo = Todos.Set<Todo>().Where(t => id == t.id);
            if (todo == null)
            {
                return NotFound();
            }

            Todos.Update(newTodo);
            return new NoContentResult();
        }
    }

}
