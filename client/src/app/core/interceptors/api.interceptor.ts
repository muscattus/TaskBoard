import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  BASE_URL = 'http://localhost:3300/api' //todo path to constants

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const url = this.BASE_URL + request.url;
      const accessToken = localStorage.getItem('token');
      let headers;
      if(accessToken) {
        headers = {Authorization: `Bearer ${accessToken}`};
      }
    return next.handle(request.clone({url, setHeaders: headers}));
  }
}