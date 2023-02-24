import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {
  isRegistered: boolean = true;

  switchToSignup(): void {
    this.isRegistered = false;
  }
  switchToLogin(): void {
    this.isRegistered = true;
  }
}
