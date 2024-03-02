using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SignalRChat.Application.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Utils
{
    public class UploadService : IUploadService
    {
        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _configuration;
        public UploadService(Cloudinary cloudinary, IConfiguration configuration)
        {
            _cloudinary = cloudinary;
            _configuration = configuration;
        }

        public async Task<string> UploadFile(string fileName, byte[] byteArray)
        {
            Console.WriteLine($"File name: {fileName}");
            using Stream stream = new MemoryStream(byteArray);
            var uploadParams = new RawUploadParams()
            {
                File = new FileDescription(fileName, stream),
                Folder = "SignalR",
                UseFilename = true
            };
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            var type = uploadResult.ResourceType;
            //Console.WriteLine(type);
            //Console.WriteLine(uploadResult.Url.ToString());
            return uploadResult.Url.ToString();
        }
    }
}
