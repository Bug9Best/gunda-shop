import { Component, OnInit, ViewChild } from '@angular/core';
import { getDocs, Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-master-grade',
  templateUrl: './master-grade.component.html',
  styleUrls: ['./master-grade.component.scss']
})
export class MasterGradeComponent implements OnInit {
  user$ = this.userService.getCurrentUser();

  masterGradeList: any = [];
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
    const firebase = collection(this.firestore, 'master-grade');
    getDocs(firebase).then((response) => {
      this.masterGradeList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
    })
  }

  showDetail(id: any) {
    this.showDialog = true;
    this.masterGradeList.forEach((item: any) => {
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
        getDocs(ref).then((response) => {
          let isExist = false;
          response.docs.map((item) => {
            if (item.data()['product']['id'] === this.productDetail.id) {
              isExist = true;
              this.messageService.add({ severity: 'warn', summary: 'คำเตือน!', detail: 'มีสินค้ารายการนี้อยู่ในตระกร้าของคุณเเล้ว' });
            }
          })
          if (isExist === false) {
            addDoc(ref, {
              product: this.productDetail,
              amount: this.amount
            })
              .then(() => { this.messageService.add({ severity: 'success', summary: 'สำเร็จ!', detail: 'เพิ่มสินค้าลงตะกร้าสำเร็จ' }); }
              )
          }
        })
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'ผิดพลาด!', detail: 'กรุณาเข้าสู่ระบบก่อน' });
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