import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;

  constructor() { }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const email= form.value.email;
    const password= form.value.password;
    form.reset();

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
}
