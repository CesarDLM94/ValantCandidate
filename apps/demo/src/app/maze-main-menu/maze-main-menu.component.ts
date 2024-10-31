import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { LoggingService } from '../logging/logging.service';
import { StuffService } from '../stuff/stuff.service';

@Component({
  selector: 'valant-maze-main-menu',
  templateUrl: './maze-main-menu.component.html',
  styleUrls: ['./maze-main-menu.component.less']
})
export class MazeMainMenuComponent implements OnInit {
  file: File | null = null; // Variable to store file
  listOfMazes:  number[] =  [];
  currentSelectedMenuType : number = 0;
  currentMazeId: number = 0;
  constructor(private logger: LoggingService, private stuffService: StuffService, private filerUploader: FileUploaderService) { }

  onUpload():void{
    if (this.file) {
        const formData = new FormData();

        formData.append('file', this.file, this.file.name);
        console.log("File uploader:" + this.filerUploader);
        var mazeId = this.listOfMazes.length + 1;
        this.listOfMazes.push(mazeId);

        this.filerUploader.uploadFile(formData, mazeId).subscribe({
          next: (response: any) => {
            // this.status = 'success';
          },
          error: (error) => {
            // this.status = 'fail';
            this.logger.error('Error uploading file: ', error);
          },
        });;
      }
  }

  
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  activateMazeMode(idOfMaze:number){
    this.currentMazeId = idOfMaze;
    this.currentSelectedMenuType = 1;

  }

  get currentMaze() {
    return this.listOfMazes.filter( mazeId => mazeId === this.currentMazeId);
  }

  activateMenuMode(){
    this.currentSelectedMenuType = 0;
  }

  ngOnInit(): void {
  }

}
