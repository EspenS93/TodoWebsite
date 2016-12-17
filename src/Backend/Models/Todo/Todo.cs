using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Backend.Models.Todo
{
    public class Todo
    {
        public string id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string type { get; set; }
        public string userID { get; set; }
    }
}
