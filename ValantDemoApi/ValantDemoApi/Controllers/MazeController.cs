using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using ValantDemoApi.Library;
using ValantDemoApi.Library.MazeCommandBuilderPattern;
using ValantDemoApi.Models;
using ValantDemoApi.Services;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MazeController : ControllerBase
    {
        private readonly ILogger<MazeController> _logger;
        private readonly IMazeCommandsService _mazeCommandService;
        private readonly IFileReaderService _fileReaderService;


        public MazeController(ILogger<MazeController> logger, IMazeCommandsService mazeCommandService, IFileReaderService fileReaderService)
        {
            _logger = logger;
            _mazeCommandService = mazeCommandService;
            _fileReaderService = fileReaderService;
        }

      [HttpGet]
      public async Task<IEnumerable<string>> GetNextAvailableMoves([FromQuery(Name = "coordinate")] Dictionary<int, int> positions)
      {
        if(positions.Any())
        {
        try
        {
          return _mazeCommandService.GetNearbyCellCommands(positions);

        }
        catch (Exception ex)
        {
          _logger.LogError(ex.ToString());
        }

        }
        return new List<string>();
      }



    [HttpPost]
    [Route("uploadFile")]
    public async Task<IActionResult> PostUploadMazeFile([FromForm] IFormFile file, int mazeId)
    {
      if (file.Length <= 0 || file.ContentType is null) return BadRequest();

      var fileString = _fileReaderService.Read(file);
      var jsonFile = JsonConvert.DeserializeObject<MazeFileSetting>(fileString);
      try
      {
        _mazeCommandService.SetMazeMatrix(jsonFile.Rows.Values.ToList(), mazeId);

      } catch (Exception ex)
      {
        _logger.LogError(ex.ToString());
      }


      return Ok();
    }

    [HttpGet]
    [Route("getMazeSchema")]
    public async Task<IEnumerable<IEnumerable<MazeSchemaResponse>>> GetMazeSchema(int mazeId)
    {
      var mazeSchema = _mazeCommandService.GetMazeSchema(mazeId);
      if(mazeSchema == null)
      {
        _logger.LogError($"The maze id {mazeId} does not belong to any registered mazes.");
      }
      return mazeSchema;
    } 
  }
}

