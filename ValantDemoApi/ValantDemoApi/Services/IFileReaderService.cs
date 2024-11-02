using Microsoft.AspNetCore.Http;

namespace ValantDemoApi.Services
{
  public interface IFileReaderService
  {
    string Read(IFormFile file);
  }
}
