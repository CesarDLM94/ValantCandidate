using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using NUnit.Framework;
using ValantDemoApi.Services;

namespace ValantDemoApi.Tests
{
    [TestFixture]
    public class ValantDemoApiTests
    {
      private HttpClient client;
      private IMazeCommandsService mazeCommandService;
      [OneTimeSetUp]
        public void Setup()
        {
          var factory = new APIWebApplicationFactory();
          this.client = factory.CreateClient();
          mazeCommandService = new MazeCommandsService();
    }

        [Test]
        public async Task ShouldReturnAllFourDirectionsForMovementThroughMaze()
        {
          var result = await this.client.GetAsync("/Maze");
          result.EnsureSuccessStatusCode();
          var content = JsonConvert.DeserializeObject<string[]>(await result.Content.ReadAsStringAsync());
          content.Should().Contain("Up");
          content.Should().Contain("Down");
          content.Should().Contain("Left");
          content.Should().Contain("Right");
        }


    [Test]
    public void ValidateInvalidMazeId()
    {
      //Arrange
      int targetId = 0;

      //Act
      var nullMaze = mazeCommandService.GetMazeSchema(targetId);
      
      //Assert
      Assert.IsNull(nullMaze);
    }

    [Test]
    public void ValidateNotSetMazeReturnsEmptyCells()
    {
      //Arrange
      var positions = new Dictionary<int, int>
      {
        { 0, 0 }
      };

      //Act
      var cells = mazeCommandService.GetNearbyCellCommands(positions);

      //Assert
      Assert.IsFalse(cells.Any());
    }

    [Test]
    public void ValidateInsertionOfCoordinateValues()
    {
      var x = 0;
      var y = 0;
      //Arrange
      var coordinateValues = new List<List<int>>
      {
        { new List<int>()
          {
            { x },
            { y }
          }
        }
      };


      //Act
      mazeCommandService.SetMazeMatrix(coordinateValues, 0);

      var mazeSchema = mazeCommandService.GetMazeSchema(0);

      //Assert
      Assert.IsTrue(mazeSchema.Any());
    }



  }
}
