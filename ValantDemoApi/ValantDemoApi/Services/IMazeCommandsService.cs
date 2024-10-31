using System.Collections;
using System.Collections.Generic;
using ValantDemoApi.Models;

namespace ValantDemoApi.Services
{
  public interface IMazeCommandsService
  {
    IEnumerable<string> GetNearbyCellCommands(Dictionary<int, int> positions);
    void SetMazeMatrix(List<List<int>> matrix, int matrixId);

    List<List<int>> GetMazeMatrix();

    IEnumerable<IEnumerable<MazeSchemaResponse>> GetMazeSchema(int mazeId);
  }
}
