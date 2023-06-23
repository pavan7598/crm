import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor( ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
     // console.log(`Bearer ${window.sessionStorage.getItem('token')}`);
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
              }
          });

      return next.handle(request);
  }
  
}