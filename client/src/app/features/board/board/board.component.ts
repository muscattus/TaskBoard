import { UserService } from './../../../core/services/user/user.service';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  isLoggedIn = false;
  isLoggedIn$ = this.userService.getUserObservable().pipe(
    map(user => !!user)
  );

  logout(): void{
    this.userService.clearData();
    this.router.navigateByUrl('/auth');
  }
}
