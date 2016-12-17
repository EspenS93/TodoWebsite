using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Todo
{
    public class TodoRepository : ITodoRepository
    {
        private static ConcurrentDictionary<string, Todo> _todos =
              new ConcurrentDictionary<string, Todo>();

        public TodoRepository()
        {
        }

        public IEnumerable<Todo> GetTodos()
        {
            return _todos.Values;
        }

        public IEnumerable<Todo> GetTodosByType(string type)
        {
            return _todos.Values;
        }

        public void Add(Todo todo)
        {
            todo.id = Guid.NewGuid().ToString();
            _todos[todo.id] = todo;
        }

        public Todo Get(string id)
        {
            Todo todo;
            _todos.TryGetValue(id, out todo);
            return todo;
        }

        public Todo Delete(string id)
        {
            Todo todo;
            _todos.TryRemove(id, out todo);
            return todo;
        }

        public void Update(Todo todo)
        {
            _todos[todo.id] = todo;
        }
    }
}
