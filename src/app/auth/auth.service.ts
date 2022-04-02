import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMaZUEFPt5XW5KokGV9XMDNAPMnO54-eI', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

}
