import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';


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

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMaZUEFPt5XW5KokGV9XMDNAPMnO54-eI', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {

        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      
      })
    );
  }

  login(email: string, password:string) {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMaZUEFPt5XW5KokGV9XMDNAPMnO54-eI', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }   
    )
    .pipe(catchError(this.handleError), tap(resData => {

      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    
    }));;    
  }

  logOut() {
    this.user.next(null);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000 );
      const user = new User(
        email,
        userId,
        token, 
        expirationDate
      );
        this.user.next(user);
  }

  private handleError(errResponse: HttpErrorResponse) {
      let errorMessage = "An unknown error occured !";

      if(!errResponse.error || !errResponse.error.error) {
        return throwError(()=> new Error(errorMessage))
      }

      switch (errResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "This email already exists"
          break;

        case 'EMAIL_NOT_FOUND':
          errorMessage = "Email not found"
          break;

        case 'INVALID_PASSWORD':
          errorMessage = "Invalid password" 
          break;
          
        default: 
          errorMessage = "An unknown error occured !"
      }
      
      return throwError(()=> new Error(errorMessage));
  }
  
}
