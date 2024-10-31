using System.Collections.Generic;

namespace ValantDemoApi.Library.MazeCommandBuilderPattern
{
  public class CommandBuilder
  {
    private List<string> ValidCommands;
    private int StartingX { get; set; }
    private int StartingY { get; set; }

    private List<List<int>> Matrix { get; set; }
    public CommandBuilder(int startingX, int startingY, List<List<int>> matrixToCompare)
    {
      ValidCommands = new List<string>();
      StartingX = startingX;
      StartingY = startingY;
      Matrix = matrixToCompare;
    }

    public void TryAddUpCommand()
    {
      TryAddMovement(StartingY - 1, StartingX, MazeCommands.LeftCommand);
    }

    public void TryAddDownCommand()
    {
      TryAddMovement(StartingY + 1, StartingX, MazeCommands.RightCommand);
    }

    public void TryAddRightCommand()
    {
      TryAddMovement(StartingY, StartingX + 1, MazeCommands.DownCommand);
    }

    public void TryAddLeftCommand()
    {
      TryAddMovement(StartingY, StartingX - 1, MazeCommands.UpCommand);
    }

    private void TryAddMovement(int positionY, int positionX, string movementType)
    {

      if (positionY < 0 || positionX < 0 || positionX >= Matrix.Count)
      {
        return;
      }

      var row = Matrix[positionX];
      if (positionY >= row.Count)
      {
        return;
      }
      var valueOnArray = Matrix[positionX][positionY];
      switch (valueOnArray)
      {
        case 1:
        case 2:
        case 3:
          ValidCommands.Add(movementType);
          break;
      }
    }

    public IEnumerable<string> GetValidCommands()
    {
      return ValidCommands;
    }
  }
}
