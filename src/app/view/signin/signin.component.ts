import { Component, OnInit } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  isSignInWithEmailLink,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(public auth: Auth) { }

  ngOnInit(): void {
  }

  checkUser(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response: any) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      })
  }
}
