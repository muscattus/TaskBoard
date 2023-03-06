import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { AuthApiService } from './auth.api.service';
import { User, Credentials } from './auth.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: AuthApiService,
    private userService: UserService
  ) { }

  saveUser(user: Credentials): Observable<User> {
    return this.apiService.saveUser(user).pipe(
      tap( response => {
        this.handleResponse(response)
      })
    );
  }

  login(credentials: Credentials): Observable<User> {
    return this.apiService.login(credentials).pipe(
      tap( response => {
        this.handleResponse(response);
      })
    );
  }

  authMe(): Observable<User> {
    return this.apiService.authMe();
  }

  private handleResponse(response: User) {
    localStorage.setItem('token', response.accessToken);
    this.userService.setCurrentUser(response);
  }
}
