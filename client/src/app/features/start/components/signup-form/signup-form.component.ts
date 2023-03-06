import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  
  @Output() goToLogin = new EventEmitter<boolean>();
  
  user: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  switchToLogin(): void {
    this.goToLogin.emit(true);
  }

  saveUser(): void{
    const newUser = {
      username: this.user,
      password: this.password
    };
    this.authService.saveUser(newUser)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        }
      );
  }
}
