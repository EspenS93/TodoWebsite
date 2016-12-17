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
        public TodoController(ITodoRepository todoItems)
        {
            TodoItems = todoItems;
        }

        public ITodoRepository TodoItems { get; set; }
        [HttpGet]
        public IEnumerable<Todo> GetAll()
        {
            return TodoItems.GetTodos();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetTodo(string id)
        {
            var todo = TodoItems.Get(id);
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
            TodoItems.Add(todo);
            return CreatedAtRoute("GetTodo", new { id = todo.id }, todo);
        }
    }

}
