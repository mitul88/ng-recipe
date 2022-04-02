import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const email= form.value.email;
    const password= form.value.password;

    this.authService.signUp(email, password);
    form.reset();

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
}
