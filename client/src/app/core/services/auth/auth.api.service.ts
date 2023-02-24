import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Credentials } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  saveUser(user: Credentials): Observable<User> {
    return this.http.post<User>('/auth/signup', user); //todo: paths to constants
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>('/auth/signin', credentials);
  }

  authMe(): Observable<User> {
    // const headers = {
    //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImgtR3liR2g5eSIsImlhdCI6MTY3NjkzNzgyNywiZXhwIjoxNjc3MDI0MjI3fQ.EEnxq9Mtokkav9vMDQ5ekEzcGVvINBvMATQROHMzrwU`
    // }
    // const requestOptions = {            
    //   headers: new HttpHeaders(headers), 
    // };
    return this.http.get<User>('/auth/me');
  }
}
