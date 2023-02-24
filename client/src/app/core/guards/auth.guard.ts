import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handle(route);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  handle(route: ActivatedRouteSnapshot) {
    const path = route.routeConfig?.path;
    return this.userService.getUserObservable().pipe(
      take(1),
      map(user => {
        switch (path){
          case 'board':
            return user !== null ? true : this.router.createUrlTree(['/', 'auth']);
          case 'auth':
            return user === null ? true : this.router.createUrlTree(['/', 'board']);
          default:
            return false
        }
      })
    )
  } 
  
}
