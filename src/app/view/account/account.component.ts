import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { addDoc, getDocs, updateDoc, deleteDoc, Firestore, collection, doc, } from '@angular/fire/firestore';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  user$ = this.userService.getCurrentUser();
  readOnly = true;
  userOrder: any = [];

  userData: User = {
    uid: '',
    firstname: '',
    lastname: '',
    email: '',
    photoURL: '',
    address: '',
  };

  addressForm = new FormGroup({
    address: new FormControl(''),
  });

  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.getUser();
    this.getOrder()
  }

  ngOnInit(): void {
  }

  getUser() {
    this.user$.subscribe((user) => {
      this.userData.uid = user?.uid || '';
      this.userData.firstname = user?.firstname;
      this.userData.lastname = user?.lastname;
      this.userData.email = user?.email;
      this.userData.photoURL = user?.photoURL;
      this.userData.address = user?.address;
    });
  }

  editAddress() {
    this.readOnly = false;
    this.addressForm.patchValue({
      address: this.userData.address,
    });
  }

  cancleEdit() {
    this.readOnly = true;
  }

  getOrder() {
    if (this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'orders');
        getDocs(ref).then((response) => {
          this.userOrder = [...response.docs.map((item) => {
            return { ...item.data(), id: item.id }
          })]
        })
      }
    }))
      return;
  }

  submitEdit(event: Event) {
    const addressForm = this.addressForm.value;

    if (!this.user$) return; { }
    const firebase = doc(this.firestore, 'users', this.userData.uid);

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'bg-neutral-900 text-white border-none focus:outline-none focus:ring-0 focus:bg-neutral-800 focus:border-0 ui-button-success',
      rejectButtonStyleClass: 'text-neutral-900 border-0 focus:outline-none focus:ring-0 hoverButton ui-button-success',
      accept: () => {
        this.readOnly = true;
        updateDoc(firebase, { address: addressForm.address }).then(() => {
          this.getUser();
          this.messageService.add({ severity: 'success', summary: 'บันทึกข้อมูลสำเร็จ', detail: 'บันทึกข้อมูลสำเร็จ' });
        }).catch((error) => {
          this.messageService.add({ severity: 'error', summary: 'บันทึกข้อมูลไม่สำเร็จ', detail: 'บันทึกข้อมูลไม่สำเร็จ' });
        });
      },
      reject: () => {
      }
    });
  }
}
