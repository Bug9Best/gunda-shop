import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user';
import { AuthenService } from 'src/app/service/authen/authen.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$ = this.usersService.getCurrentUser();

  cartList: any = [];
  badgeNumber: string = '0';

  value = '';

  items = [
    { label: 'บัญชีของฉัน', icon: 'pi pi-fw pi-user', command: () => { this.goAccount(); } },
    { label: 'ออกจากระบบ', icon: 'pi pi-fw pi-sign-out', command: () => { this.signOut(); } },
  ];

  userData: User = {
    uid: '',
    firstname: '',
    lastname: '',
    email: '',
    photoURL: '',
    address: '',
  };

  constructor(
    public usersService: UserService,
    public authenService: AuthenService,
    private router: Router,
    private firestore: Firestore,
  ) {
    this.updateBadge();
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userData.uid = user?.uid || '';
      this.userData.firstname = user?.firstname;
      this.userData.lastname = user?.lastname;
      this.userData.email = user?.email;
      this.userData.photoURL = user?.photoURL;
      this.userData.address = user?.address;
    });
  }

  goAccount() {
    this.router.navigate(['/account']);
  }

  signOut() {
    this.authenService.signout();
  }

  updateBadge() {
    if (this.user$.subscribe((user) => {
      if (user) {

      }
      else {
        console.log(this.badgeNumber);
        this.badgeNumber = Object.keys(localStorage).length.toString();
      }
    }))
      return;
  }
}