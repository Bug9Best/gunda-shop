import { Component, OnInit, ViewChild } from '@angular/core';
import { getDocs, Firestore, collection, addDoc, updateDoc, doc } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-high-grade',
  templateUrl: './high-grade.component.html',
  styleUrls: ['./high-grade.component.scss']
})
export class HighGradeComponent implements OnInit {
  user$ = this.userService.getCurrentUser();
  highGradeList: any = [];
  productDetail: any = [];
  cartList: any = [];
  showDialog: boolean = false;
  images: any[] = [];
  amount: number = 1;

  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.getData();
    this.getCart();
  }

  ngOnInit(): void {
  }

  getData() {
    const firebase = collection(this.firestore, 'high-grade');
    getDocs(firebase).then((response) => {
      this.highGradeList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
    })
  }

  showDetail(id: any) {
    this.showDialog = true;
    this.highGradeList.forEach((item: any) => {
      if (item.id === id) {
        this.productDetail = item;
        this.images = [
          { "src": this.productDetail.productURL },
          { "src": this.productDetail.productBG },
          { "src": this.productDetail.boxURL }
        ];
      }
    })
  }

  getCart() {
    if (this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        getDocs(ref).then((response) => {
          response.docs.map((item) => {
            this.cartList.push(item.data());
          })
        })
      }
    }))
      return;
  }

  addToCart() {
    if (this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        if (this.cartList.length === 0) {
          addDoc(ref, {
            product: this.productDetail,
            amount: this.amount,
          }).then(() => {
            this.messageService.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เพิ่มสินค้าเข้าตะกร้าสำเร็จ' });
            this.showDialog = false;
            this.getCart();
          })
        }
        else {
          this.cartList.forEach((item: any) => {
            if (item.product.id === this.productDetail.id) {
              getDocs(ref).then((response) => {
                response.docs.map((item) => {
                  if (item.data()['product'].id === this.productDetail.id) {
                    updateDoc(doc(this.firestore, 'users', user.uid, 'carts', item.id), {
                      amount: item.data()['amount'] + this.amount
                    }).then(() => {
                      this.messageService.add({ severity: 'warn', summary: 'มีสินค้ารายการนี้อยู่ในตระกร้าของคุณเเล้ว', detail: 'ทำการเพิ่มจำนวนสินค้าแทน' });
                      this.showDialog = false;
                      this.getCart();
                    })
                  }
                })

              })
            }
          })
        }
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'เกิดข้อผิดพลาด',
          detail: 'ทำการล็อคอินก่อนเพื่อเพิ่มสินค้าเข้าตะกร้า'
        });
      }
    }))
      this.showDialog = false;
  }

  decrease() {
    this.amount--;
    if (this.amount <= 0) {
      this.amount = 1;
    }
  }

  increase() {
    this.amount++;
  }
}
