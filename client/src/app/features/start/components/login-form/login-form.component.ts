import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor( private authService: AuthService, private router: Router) {}
  @Output() goToSignup = new EventEmitter<boolean>();

  username: string = '';
  password: string = '';

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    }
    this.authService.login(credentials).subscribe(() => this.router.navigateByUrl('/'))
  }
  switchToSignup(): void {
    this.goToSignup.emit(true);
  }

  // authMe() {
  //   this.authService.authMe().subscribe((res) => console.log(res));
  // }
}
