import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { StuffService } from '../stuff/stuff.service';
import { LoggingService } from '../logging/logging.service';

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
  selector: 'valant-maze-game',
  templateUrl: './maze-game.component.html',
  styleUrls: ['./maze-game.component.less']
})



export class MazeGameComponent implements OnInit {
  @Input() mazeId:number;
  MazeGameStyleClass = "upperBorder";
  selectedCellX = 0;
  public data: string[];
  selectedCellY = 0;
  isMazeCompleted = false;
  definedStartCell = false;
  MazeCollection : MazeCellInstance[][];
  constructor(private logger: LoggingService, private stuffService: StuffService, private cdref: ChangeDetectorRef) {
    
   }

   private getStuff(callback): void {
    this.stuffService.getStuff(this.selectedCellX, this.selectedCellY).subscribe({
      next: (response: string[]) => {
        this.data = response;
        if(callback){
          callback();
        }
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }



   highlightCurrent():void{
    console.log("Pressed key");
   }

   isCurrentSelectedCell(cellInstance:any){
    var isCurrentCoordinate = cellInstance.isStart;
    if(isCurrentCoordinate && !this.definedStartCell){
      this.selectedCellX = cellInstance.x;
      this.selectedCellY = cellInstance.y;
      cellInstance.isStart = false;
      this.definedStartCell= true;
      return isCurrentCoordinate;
    }
    if(this.definedStartCell){
      isCurrentCoordinate = this.selectedCellX === cellInstance.x && this.selectedCellY === cellInstance.y ? true : null;
    }
    return isCurrentCoordinate;
   }

   isAccordingIndexesSelected(cellInstance:any){
    return this.selectedCellX === cellInstance.x && this.selectedCellY === cellInstance.y ? true : null;
   }

   completedMaze(cellInstance:any){
    var isFinalCell = cellInstance.isEnd
    if(isFinalCell && this.isAccordingIndexesSelected(cellInstance)){
      this.isMazeCompleted = true;
      this.cdref.detectChanges();
    }
   }

   moveDown():void{
    this.getStuff(() => {
      if(this.data.includes("down")){
      
            this.selectedCellX = this.selectedCellX + 1;
          }
    });
    
   }

   moveLeft():void{
    this.getStuff(() => {
      if(this.data.includes("left")){
      
        this.selectedCellY = this.selectedCellY - 1;
      }
    });
   }

   moveRight():void{
    this.getStuff(() => {
      if(this.data.includes("right")){
        this.selectedCellY = this.selectedCellY + 1;
      }
    });
    
   }

   moveUp():void{
    this.getStuff(() => {
      if(this.data.includes("up")){
        this.selectedCellX = this.selectedCellX - 1;
      }
    });
    
   }

  ngOnInit(): void {
    this.logger.log('Welcome to the AppComponent');
    // this.getStuff();
    this.renderMaze();
  }

  renderMaze():void{
    this.stuffService.getMazeSchema(this.mazeId).subscribe({
      next: (response: MazeCellInstance[][]) => {
        // this.data = response;
        // this.MazeCollection = response;
        this.MazeCollection = response;
        // this.MazeCollection  = [[{x: 0, y: 0, walls: ["left", "up", ], paths:["right"]}, 
        // {x: 1, y: 0, walls: [ "up", "down"], paths:["left","right"]},
        // {x: 2, y: 0, walls: [ "up", "down"], paths:["left","right"]}
        // ]]
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }

}
