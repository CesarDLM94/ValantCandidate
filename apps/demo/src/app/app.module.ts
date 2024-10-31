import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoggingService } from './logging/logging.service';
import { StuffService } from './stuff/stuff.service';
import { environment } from '../environments/environment';
import { ValantDemoApiClient } from './api-client/api-client';
import { MazeGameComponent } from './maze-game/maze-game.component';
import { MazeGameCellComponent } from './maze-game/components/maze-game-cell/maze-game-cell.component';
import { FileUploaderService } from './fileUploader/fileUploader.service';
import { MazeMainMenuComponent } from './maze-main-menu/maze-main-menu.component';

export function getBaseUrl(): string {
  return environment.baseUrl;
}

@NgModule({
  declarations: [AppComponent, MazeGameComponent, MazeGameCellComponent, MazeMainMenuComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    LoggingService,
    StuffService,
    FileUploaderService,
    ValantDemoApiClient.Client,
    { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
