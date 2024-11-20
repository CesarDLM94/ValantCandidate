import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

declare interface MazeCellInstance {
  x: number;
  y: number;
  isWall: boolean;
  isEnd: boolean;
  isStart: boolean;
  walls: string[];
  paths: string[];
}


@Component({
  selector: 'valant-maze-game-cell',
  templateUrl: './maze-game-cell.component.html',
  styleUrls: ['./maze-game-cell.component.less']
})


export class MazeGameCellComponent implements OnInit {
  @Input() styleClass: string;
  @Input() cellInstance: any;
  @Input() selected:boolean;
  @Input() completedCell:boolean;

  @Input() isStart:boolean;
  @Input() isEnd:boolean;
  constructor(){
    
  }

  getCellClassStyle(cell : MazeCellInstance){
    var classesToReturn = [];
    cell.walls.forEach(wall => {
      classesToReturn.push(wall + "WallCell");
    });
    if(this.selected){
      classesToReturn.push("selectedBackground");
    }
    if(cell.isWall){
      classesToReturn.push("wallBackground");
    }

    if(cell.isEnd){
      classesToReturn.push("endBackground");
    }
    return classesToReturn.join(" ");
  }

  ngOnInit(): void {
  }

}
