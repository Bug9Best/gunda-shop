import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { AuthenService } from 'src/app/service/authen/authen.service';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';
import { User } from 'src/app/model/user';
import { first } from 'rxjs';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$ = this.usersService.getCurrentUser();

  userData: User = {
    uid: '',
    firstname: '',
    lastname: '',
    email: '',
    photoURL: '',
  };

  constructor(
    public usersService: UserService,
    public authenService: AuthenService,
    public firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userData.uid = user?.uid || '';
      this.userData.firstname = user?.firstname;
      this.userData.lastname = user?.lastname;
      this.userData.email = user?.email;
      this.userData.photoURL = user?.photoURL;
    });

    console.log(this.userData);
  }
}