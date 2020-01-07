using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSignalR_Chat.Hubs
{
    public class Person
    {
        public string Group { get; set; }
        public string Name { get; set; }

        public string Message { get; set; }
    }
}
