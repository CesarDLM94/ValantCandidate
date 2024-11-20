import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';

declare interface MazeCellInstance {
  x: number;
  y: number;
  isWall: boolean;
  isEnd: boolean;
  isStart: boolean;
  walls: string[];
  paths: string[];
}

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getStuff(positionX:number, positionY:number): Observable<string[]> {
    return this.httpClient.maze(positionX, positionY);
  }

  public getMazeSchema(mazeId:number): Observable<MazeCellInstance[][]> {
    return this.httpClient.mazeSchema(mazeId);
  }
}
