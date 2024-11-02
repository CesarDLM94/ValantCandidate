using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using ValantDemoApi.Library;
using ValantDemoApi.Library.MazeCommandBuilderPattern;
using ValantDemoApi.Models;

namespace ValantDemoApi.Services
{
  public class MazeCommandsService : IMazeCommandsService
  {

    private static List<List<int>> MazeMatrix = new List<List<int>>();
    private static Dictionary<int, List<List<int>>> MazeSchemas = new Dictionary<int, List<List<int>>>();

    public IEnumerable<string> GetNearbyCellCommands(Dictionary<int, int> positions)
    {
      foreach (var coordinate in positions)
      {
        var commandBuilder = new CommandBuilder(coordinate.Key, coordinate.Value, MazeMatrix);
        commandBuilder.TryAddLeftCommand();
        commandBuilder.TryAddRightCommand();
        commandBuilder.TryAddUpCommand();
        commandBuilder.TryAddDownCommand();
        return commandBuilder.GetValidCommands();
      }
      return new List<string>();
    }

    public void SetMazeMatrix(List<List<int>> matrix, int matrixId)
    {
      MazeSchemas.TryAdd(matrixId, matrix);
      MazeMatrix = matrix;
    }

    public IEnumerable<IEnumerable<MazeSchemaResponse>> GetMazeSchema(int mazeId)
    {
      MazeSchemas.TryGetValue(mazeId, out var schemaResult);
      if(schemaResult == null)
      {
        return null;
      }
      MazeMatrix = schemaResult;

      var rowList = new List<List<MazeSchemaResponse>>();
      for (var horizontalIndex = 0; horizontalIndex < MazeMatrix.Count; horizontalIndex++)
      {
        var listOfSchemas = new List<MazeSchemaResponse>();

        for (var verticalIndex = 0; verticalIndex < MazeMatrix[horizontalIndex].Count; verticalIndex++)
        {
          var mazeSchemaResult = new MazeSchemaResponse();
          mazeSchemaResult.X = horizontalIndex;
          mazeSchemaResult.Y = verticalIndex;

          GetCellsNearby(horizontalIndex, verticalIndex, mazeSchemaResult);
          listOfSchemas.Add(mazeSchemaResult);
        }
        rowList.Add(listOfSchemas);
      }

      return rowList;
    }

    private void GetCellsNearby(int x, int y, MazeSchemaResponse cellInstance)
    {
      GetIfSpecialCell(x, y, cellInstance);
      GetMazeCellType(x + 1, y, MazeCommands.DownCommand, cellInstance);
      GetMazeCellType(x - 1, y, MazeCommands.UpCommand, cellInstance);
      GetMazeCellType(x, y + 1, MazeCommands.RightCommand, cellInstance);
      GetMazeCellType(x, y - 1, MazeCommands.LeftCommand, cellInstance);

    }

    private void GetIfSpecialCell(int x, int y, MazeSchemaResponse cellInstance)
    {
      var row = MazeMatrix.ElementAtOrDefault(x);
      if (row == default(List<int>) || x < 0 || x >= MazeMatrix.Count)
      {
        return;
      }

      if (y >= row.Count || y < 0)
      {
        return;
      }

      switch (MazeMatrix[x][y])
      {
        case 0:
          cellInstance.IsWall = true;
          break;
        case 2:
          cellInstance.IsStart = true;
          break;
        case 3:
          cellInstance.IsEnd = true;
          break;

      }

    }



    private void GetMazeCellType(int x, int y, string sideOrientation, MazeSchemaResponse cellInstance)
    {
      var row = MazeMatrix.ElementAtOrDefault(x);
      if (row == default(List<int>) || x < 0 || x >= MazeMatrix.Count)
      {
        cellInstance.AddWall(sideOrientation);
        return;
      }

      if (y >= row.Count || y < 0)
      {
        cellInstance.AddWall(sideOrientation);
        return;
      }

      switch (MazeMatrix[x][y])
      {
        case 0:
          cellInstance.AddWall(sideOrientation);
          break;
        case 1:
          cellInstance.AddPath(sideOrientation);
          break;
        
      }
    }
  }
}
