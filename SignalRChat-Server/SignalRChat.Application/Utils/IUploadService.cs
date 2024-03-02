using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Utils
{
    public interface IUploadService
    {
        Task<string> UploadFile(string fileName, byte[] byteArray);
    }
}
