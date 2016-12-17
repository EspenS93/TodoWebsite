using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.User
{
    public interface IUserRepository
    {
        void Add(User user);
        IEnumerable<User> GetUsers();
        User Get(string id);
        User Delete(string id);
        void Update(User user);
    }
}
