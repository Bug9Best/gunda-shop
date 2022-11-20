import { Component, OnInit } from '@angular/core';
import { addDoc, getDocs, updateDoc, deleteDoc, Firestore, collection, doc, } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  showDialog: boolean = false;
  orderNo: string = "";
  user$ = this.userService.getCurrentUser();
  cartList: any = [];
  reset = false;
  address = "";

  constructor(
    private router: Router,
    private firestore: Firestore,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getCart(false);
    this.generateOrder();
  }

  getCart(reset: boolean) {
    if (this.user$.subscribe((user) => {
      if (user) {
        this.address = user.address || "";
        if (reset === true) {
          this.totalPrice = 0;
          this.cartList = [];
          this.reset = false;
        }
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((item) => {
            this.cartList.push(item.data());
            this.totalPrice += item.data()['product']['price'] * item.data()['amount'];
          })
        })
      }
    }))
      return;
  }

  removeItem(event: any, item: any) {
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
                  this.getCart(true);
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
                  this.getCart(true);
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

  generateOrder() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      this.orderNo += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  submit() {
    this.showDialog = true;
  }

  confirm() {
    this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'orders');
        addDoc(ref, {
          orderNo: this.orderNo,
          totalPrice: this.totalPrice,
          address: this.address,
          cartList: this.cartList,
          status: 'รอการชำระเงิน',
        })
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'สำเร็จ!',
              detail: 'สั่งซื้อสินค้าสำเร็จ'
            });

            this.router.navigate(['/account']);
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
    this.showDialog = false;
  }
}
