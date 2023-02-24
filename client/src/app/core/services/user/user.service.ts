import { AuthApiService } from './../auth/auth.api.service';
import { Injectable } from '@angular/core';
import { User } from '../auth/auth.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, BehaviorSubject, tap, skipUntil, catchError, throwError, of } from 'rxjs';
// import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUser$ = new BehaviorSubject<User | null>(null);
  private isUserFetched$ = new ReplaySubject<void>();

  constructor(private authApiService: AuthApiService) { }

  // getCurrentUser() {
  //   return this.currentUser$;
  // }

  currentUserMock = {
  accessToken
  : 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImgtR3liR2g5eSIsImlhdCI6MTY3NjkzNzgyNywiZXhwIjoxNjc3MDI0MjI3fQ.EEnxq9Mtokkav9vMDQ5ekEzcGVvINBvMATQROHMzrwU",
  username
  : 
  "oinou",
  _id
  : 
  "h-GybGh9y"}
// getCurrentUser() {
//   return this.currentUserMock;
// }

  // setCurrentUser(user: User) {
  //   this.currentUser$.next(user);
  // }

  fetchUser() {
    if(!localStorage.getItem('token')){
      this.setNullUser();
      return of({} as User);
    }
    return this.authApiService.authMe().pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(error => {
        this.setNullUser();
        return throwError(error);
      }),
    );
  }

  setNullUser() {
    this.isUserFetched$.next();
    this.currentUser$.next(null);
  }
  // fetchUser() {
  //   if (localStorage.getItem('token')) {
  //     return this.authApiService.authMe().pipe(
  //       tap(user => this.setCurrentUser(user)),
  //       catchError(error => {
  //         this.isUserFetched$.next();
  //         this.currentUser$.next(null);
          
  //         return throwError(error);
  //       }),
  //       );
  //   } else {
  //     this.isUserFetched$.next();
  //     this.currentUser$.next(null);
  //     return throwError('error');
  //   }

  // }

  clearData() {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
  }

  getUserObservable() {
    // console.log('observable');
    return this.currentUser$
    .pipe(
      skipUntil(this.isUserFetched$)
    )
  }

  setCurrentUser(user: any) {
    this.isUserFetched$.next();
    this.currentUser$.next(user);
  }
} 