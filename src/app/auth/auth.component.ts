import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;

  constructor() { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
}
