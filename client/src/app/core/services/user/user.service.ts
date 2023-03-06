import { AuthApiService } from './../auth/auth.api.service';
import { Injectable } from '@angular/core';
import { User, Credentials } from '../auth/auth.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, BehaviorSubject, tap, skipUntil, catchError, throwError, of } from 'rxjs';
// import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUser$ = new BehaviorSubject<User | null>(null);
  private isUserFetched$ = new ReplaySubject<void>();

  constructor(
    private authApiService: AuthApiService
  ) { }

  fetchUser(): Observable<User> {
    if(!localStorage.getItem('token')){
      this.setNullUser();
      return of({} as User);
    }
    return this.authApiService.authMe().pipe(
      tap((user: User) => this.setCurrentUser(user)),
      catchError(error => {
        this.setNullUser();
        throw 'Was not able to authenticate'
      }),
    );
  }

  setNullUser() {
    this.isUserFetched$.next();
    this.currentUser$.next(null);
  }

  clearData() {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
  }

  getUserObservable() {
    return this.currentUser$
    .pipe(
      skipUntil(this.isUserFetched$)
    )
  }

  setCurrentUser(user: User) {
    this.isUserFetched$.next();
    this.currentUser$.next(user);
  }
} 