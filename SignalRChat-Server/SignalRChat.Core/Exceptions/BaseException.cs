using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Core.Exceptions
{
    public class BaseException : Exception
    {
        private readonly string _message;
        public BaseException(string message) : base(message) {
            _message = message;
        }
        public virtual int StatusCode => 500;
        public string GetMessage() => _message;
    }
}
