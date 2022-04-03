import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMaZUEFPt5XW5KokGV9XMDNAPMnO54-eI', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError));
  }

  login(email: string, password:string) {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMaZUEFPt5XW5KokGV9XMDNAPMnO54-eI', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }   
    );    
  }

  private handleError(errResponse: HttpErrorResponse) {
      let errorMessage = "An unknown error occured !";

      if(!errResponse.error || !errResponse.error.error) {
        return throwError(()=> new Error(errorMessage))
      }

      switch (errResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "This email already exists"
      }
      
      return throwError(()=> new Error(errorMessage));
  }
}
