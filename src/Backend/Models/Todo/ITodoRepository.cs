using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Todo
{
    public interface ITodoRepository
    {
        void Add(Todo todo);
        IEnumerable<Todo> GetTodos();
        Todo Get(string id);
        Todo Delete(string id);
        void Update(Todo todo);
    }
}
