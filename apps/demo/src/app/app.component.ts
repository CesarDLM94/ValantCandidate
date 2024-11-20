import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging/logging.service';
import { StuffService } from './stuff/stuff.service';
import { Routes } from '@angular/router';
import { MazeMainMenuComponent } from './maze-main-menu/maze-main-menu.component';
import { MazeGameComponent } from './maze-game/maze-game.component';


const routes: Routes = [
  { path: 'maze-selector', component: MazeMainMenuComponent },
  { path: 'maze-navigator', component: MazeGameComponent },
];

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})


export class AppComponent implements OnInit {
  public title = 'Valant demo';
  public data: string[];
  public positionX:number = 0;
  public positionY:number = 0;
  constructor(private logger: LoggingService, private stuffService: StuffService) {}

  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
    // this.getStuff();
  }

  private getStuff(): void {
    this.stuffService.getStuff(this.positionX, this.positionY).subscribe({
      next: (response: string[]) => {
        this.data = response;
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }
}
