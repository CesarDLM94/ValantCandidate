/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.11.1.0 (NJsonSchema v10.4.3.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { MazeModel } from '../app.model';

export module ValantDemoApiClient {
  export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

  @Injectable()
  export class Client {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
      this.http = http;
      this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @return Success
     */
    maze(): Observable<MazeModel[]> {
      let url_ = this.baseUrl + '/Maze';
      url_ = url_.replace(/[?&]$/, '');

      let options_: any = {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          Accept: 'text/plain',
        }),
      };

      return this.http
        .request('get', url_, options_)
        .pipe(
          _observableMergeMap((response_: any) => {
            return this.processMaze(response_);
          })
        )
        .pipe(
          _observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
              try {
                return this.processMaze(<any>response_);
              } catch (e) {
                return <Observable<MazeModel[]>>(<any>_observableThrow(e));
              }
            } else return <Observable<MazeModel[]>>(<any>_observableThrow(response_));
          })
        );
    }

    mazeUpload(file: FormData): Observable<string> {
      let url_ = this.baseUrl + '/Maze/upload';
      url_ = url_.replace(/[?&]$/, '');

      let options_: any = {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          Accept: 'text/plain',
        }),
      };

      console.log('inside the controller!');
      console.log(file);

      return this.http.post<string>(url_, file).pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.getMazeFromResponse(<any>response_);
            } catch (e) {
              return <Observable<string>>(<any>_observableThrow(e));
            }
          } else return <Observable<string>>(<any>_observableThrow(response_));
        })
      );

      // return this.http
      //   .request('post', url_, options_)
      //   .pipe(
      //     _observableMergeMap((response_: any) => {
      //       return this.processMaze(response_);
      //     })
      //   )
      //   .pipe(
      //     _observableCatch((response_: any) => {
      //       if (response_ instanceof HttpResponseBase) {
      //         try {
      //           return this.processMaze(<any>response_);
      //         } catch (e) {
      //           return <Observable<string[]>>(<any>_observableThrow(e));
      //         }
      //       } else return <Observable<string[]>>(<any>_observableThrow(response_));
      //     })
      //   );
    }

    protected processMaze(response: HttpResponseBase): Observable<MazeModel[]> {
      const status = response.status;
      const responseBlob =
        response instanceof HttpResponse
          ? response.body
          : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

      let _headers: any = {};
      if (response.headers) {
        for (let key of response.headers.keys()) {
          _headers[key] = response.headers.get(key);
        }
      }
      if (status === 200) {
        return blobToText(responseBlob).pipe(
          _observableMergeMap((_responseText) => {
            let result200: any = null;
            result200 = _responseText === '' ? null : <string[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
          })
        );
      } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(
          _observableMergeMap((_responseText) => {
            return throwException('An unexpected server error occurred.', status, _responseText, _headers);
          })
        );
      }
      return _observableOf<MazeModel[]>(<any>null);
    }

    protected getMazeFromResponse(response: HttpResponseBase): Observable<string> {
      const status = response.status;
      const responseBlob =
        response instanceof HttpResponse
          ? response.body
          : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

      let _headers: any = {};
      if (response.headers) {
        for (let key of response.headers.keys()) {
          _headers[key] = response.headers.get(key);
        }
      }
      if (status === 200) {
        return blobToText(responseBlob).pipe(
          _observableMergeMap((_responseText) => {
            let result200: any = null;
            result200 = _responseText === '' ? null : <string[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
          })
        );
      } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(
          _observableMergeMap((_responseText) => {
            return throwException('An unexpected server error occurred.', status, _responseText, _headers);
          })
        );
      }
      return _observableOf<string>(<any>null);
    }
  }

  export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
    }
  }

  function throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result?: any
  ): Observable<any> {
    if (result !== null && result !== undefined) return _observableThrow(result);
    else return _observableThrow(new ApiException(message, status, response, headers, null));
  }

  function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = (event) => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}