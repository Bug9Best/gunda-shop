import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  Auth, 
  authState,
  signInWithEmailAndPassword, 
  UserCredential, 
  createUserWithEmailAndPassword
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signin(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
