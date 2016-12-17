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
        public TodoController(ITodoRepository todos)
        {
            Todos = todos;
        }
        public WebsiteDbContext context { get; set; }
        public ITodoRepository Todos { get; set; }

        [HttpGet]
        public IEnumerable<Todo> GetAll()
        {
            return Todos.GetTodos();
        }

        [HttpGet("{type}", Name = "GetTodoByType")]
        public IEnumerable<Todo> GetAllByType(string type)
        {
            return Todos.GetTodosByType(type);
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetTodo(string id)
        {
            var todo = Todos.Get(id);
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
            Todos.Add(todo);
            return CreatedAtRoute("GetTodo", new { id = todo.id }, todo);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var todo = Todos.Get(id);
            if (todo == null)
            {
                return NotFound();
            }
            else
            {
                Todos.Delete(id);
                return new NoContentResult();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Todo newTodo)
        {
            if (newTodo == null || newTodo.id != id)
            {
                return BadRequest();
            }

            var todo = Todos.Get(id);
            if (todo == null)
            {
                return NotFound();
            }

            Todos.Update(todo);
            return new NoContentResult();
        }
    }

}
