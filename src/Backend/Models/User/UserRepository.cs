using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.User
{
    public class UserRepository : IUserRepository
    {
        private static ConcurrentDictionary<string, User> _users =
              new ConcurrentDictionary<string, User>();

        public UserRepository()
        {
            Add(new User { name = "item1" });
        }

        public IEnumerable<User> GetUsers()
        {
            return _users.Values;
        }

        public void Add(User user)
        {
            user.id = Guid.NewGuid().ToString();
            _users[user.id] = user;
        }

        public User Get(string id)
        {
            User user;
            _users.TryGetValue(id, out user);
            return user;
        }

        public User Delete(string id)
        {
            User user;
            _users.TryRemove(id, out user);
            return user;
        }

        public void Update(User todo)
        {
            _users[todo.id] = todo;
        }
    }
}
