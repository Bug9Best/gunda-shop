import { Component, OnInit } from '@angular/core';
import { addDoc, getDocs, updateDoc, deleteDoc, Firestore, collection, doc } from '@angular/fire/firestore';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  user$ = this.userService.getCurrentUser();
  cartList: any = [];

  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    if (this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((item) => {
            if (this.cartList.length >= 1) {
              for (let i = 0; i < this.cartList.length; i++) {
                this.cartList.pop(i);
              }
              this.totalPrice = 0;
            }
            this.cartList.push(item.data());
            this.totalPrice += item.data()['product']['price'] * item.data()['amount'];
          })
        })
      }
    }))
      return;
  }

  removeItem(event: any, item: any) {
    console.log(this.cartList);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'คุณต้องการลบข้อมูลดังกล่าวใช่หรือไม่',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'bg-neutral-900 text-white border-none focus:outline-none focus:ring-0 focus:bg-neutral-800 focus:border-0 ui-button-success',
      rejectButtonStyleClass: 'text-neutral-900 border-0 focus:outline-none focus:ring-0 hoverButton ui-button-success',
      accept: () => {
        this.cartList = this.cartList.filter((i: any) => i.product.id !== item.product.id);
        this.totalPrice -= item.product.price * item.amount;

        if (this.user$.subscribe((user) => {
          if (user) {
            const ref = collection(this.firestore, 'users', user.uid, 'carts');
            getDocs(ref).then((response) => {
              response.docs.map((i) => {
                if (i.data()['product']['id'] === item.product.id) {
                  deleteDoc(i.ref)
                    .then(() => {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'สำเร็จ!',
                        detail: 'ลบข้อมูลสำเร็จ'
                      });
                    })
                    .catch((error) => {
                      this.messageService.add({
                        severity: 'error',
                        summary: 'ล้มเหลว!',
                        detail: error
                      });
                    })
                }
              })
            })
          }
        }))
          return;
      }
    });
  }

  increaseAmount(item: any) {
    if (this.user$.subscribe((user) => {
      if (user) {

        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((i) => {
            if (i.data()['product']['id'] === item.product.id) {
              updateDoc(i.ref, { amount: item.amount + 1 })
                .then(() => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'สำเร็จ!',
                    detail: 'อัพเดตข้อมูลสำเร็จ'
                  });
                  this.getCart();
                })
                .catch((error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'ล้มเหลว!',
                    detail: error
                  });
                })
            }
          })
        })
      }
    }))
      return;
  }

  decreaseAmount(item: any) {
    if (this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((i) => {
            if (i.data()['product']['id'] === item.product.id) {
              updateDoc(i.ref, { amount: item.amount - 1 })
                .then(() => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'สำเร็จ!',
                    detail: 'อัพเดตข้อมูลสำเร็จ'
                  });
                  this.getCart();
                })
                .catch((error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'ล้มเหลว!',
                    detail: error
                  });
                })
            }
          })
        })
      }
    }))
      return;
  }

}

