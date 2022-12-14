import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/service/authen/authen.service';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth'; 
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  showValid = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  constructor(
    public auth: Auth,
    private authenService: AuthenService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid || !email || !password) {
      this.messageService.add({
        severity: 'error',
        summary: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        detail: 'กรอกอีเมลและรหัสผ่านให้ครบถ้วน',
        life: 3000,
      });
      this.showValid = false;
      return;
    }

    signInWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        if (user) {
          this.router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'ไม่พบบัญชีของคุณบนฐานข้อมูล',
          detail: 'ตรวจสอบอีเมลและรหัสผ่านอีกครั้ง',
          life: 3000,
        });
      });
  }
}