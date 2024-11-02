using Microsoft.AspNetCore.Http;
using System.IO;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace ValantDemoApi.Services
{
  public class FileReaderService : IFileReaderService
  {
    public string Read(IFormFile file)
    {
      var result = new StringBuilder();
      using (var reader = new StreamReader(file.OpenReadStream()))
      {
        while (reader.Peek() >= 0)
        {
          result.AppendLine(reader.ReadLine());
        }
      }
      return result.ToString();
    }
    
  }
}
