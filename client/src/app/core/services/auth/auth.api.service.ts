import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Credentials } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: Credentials): Observable<User> {
    return this.http.post<User>('/auth/signup', user); //todo: paths to constants
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>('/auth/signin', credentials);
  }

  authMe(): Observable<User> {
    return this.http.get<User>('/auth/me');
  }
}
