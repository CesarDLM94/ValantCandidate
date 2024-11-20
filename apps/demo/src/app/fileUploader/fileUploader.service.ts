import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public uploadFile(formData:FormData, mazeId:number): Observable<any> {
    return this.httpClient.uploadFile(formData, mazeId);
  }
}
