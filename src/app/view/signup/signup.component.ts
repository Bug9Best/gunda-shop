import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthenService } from 'src/app/service/authen/authen.service';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && (password !== confirmPassword)) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],

})
export class SignupComponent implements OnInit {
  showValid = true;

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authenService: AuthenService,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const { firstname, lastname, email, password } = this.userForm.value;

    if (!this.userForm.valid || !firstname || !lastname || !password || !email) {
      this.messageService.add({
        severity: 'error',
        summary: 'ข้อมูลไม่ถูกต้อง',
        detail: 'ตรวจสอบข้อมูลอีกครั้ง',
        life: 3000,
      });
      this.showValid = false;
      return;
    }

    this.authenService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({ uid, email, firstname: firstname, lastname: lastname, photoURL: '', address: '' }),
        )
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
