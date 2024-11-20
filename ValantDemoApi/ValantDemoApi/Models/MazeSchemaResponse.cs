using System.Collections.Generic;

namespace ValantDemoApi.Models
{
  public class MazeSchemaResponse
  {
    public int X { get; set; }
    public int Y { get; set; }
    public List<string> Walls { get; set; }
    public List<string> Paths { get; set; }

    public bool IsStart { get; set; }
    public bool IsEnd { get; set; }

    public bool IsWall { get; set; }

    public MazeSchemaResponse()
    {
        Walls = new List<string>();
        Paths = new List<string>();
    }

    public void AddWall(string sideName)
    {
      Walls.Add(sideName);
    }

    public void AddPath(string sideName)
    {
      Paths.Add(sideName);
    }
  }
}
