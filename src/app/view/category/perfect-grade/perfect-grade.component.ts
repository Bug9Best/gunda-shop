import { Component, OnInit, ViewChild } from '@angular/core';
import { getDocs, Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-perfect-grade',
  templateUrl: './perfect-grade.component.html',
  styleUrls: ['./perfect-grade.component.scss']
})
export class PerfectGradeComponent implements OnInit {
  user$ = this.userService.getCurrentUser();
  perfectGradeList: any = [];
  productDetail: any = [];
  showDialog: boolean = false;
  images: any[] = [];
  amount: number = 1;

  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    const firebase = collection(this.firestore, 'perfect-grade');
    getDocs(firebase).then((response) => {
      this.perfectGradeList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
    })
  }
  
  showDetail(id: any) {
    this.showDialog = true;
    this.perfectGradeList.forEach((item: any) => {
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

  addToCart() {
    if (this.user$.subscribe((user) => {
      if (user) {
        const ref = collection(this.firestore, 'users', user.uid, 'carts');
        addDoc(ref, {
          product: this.productDetail,
          amount: this.amount,
        }).then(() => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'สำเร็จ!', 
            detail: 'เพิ่มสินค้าไปยังตะกร้าเรียบร้อย' });
        })
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
