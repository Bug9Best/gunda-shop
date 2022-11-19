import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user';
import { AuthenService } from 'src/app/service/authen/authen.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { getDocs, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { BadgeModule } from 'primeng/badge';
import { Observable, of, switchMap } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user = this.usersService.getCurrentUser();

  cartList: any = [];
  badgeNumber: string = '0';
  badgeNumberData = 0;

  value = '';

  items = [
    { label: 'บัญชีของฉัน', icon: 'pi pi-fw pi-user', command: () => { this.goAccount(); } },
    { label: 'ออกจากระบบ', icon: 'pi pi-fw pi-sign-out', command: () => { this.signOut(); } },
  ];



  constructor(
    public usersService: UserService,
    public authenService: AuthenService,
    private router: Router,

    private firestore: Firestore,
  ) {
  }

  ngOnInit(): void {
  }

  goAccount() {
    this.router.navigate(['/account']);
  }

  signOut() {
    this.authenService.signout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}