using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    public class HelloController : Controller
    {
       [Route("/api/hello")]
       public string Hello()
        {
            return "Hello World!";
        }
    }
}
