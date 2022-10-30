import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-high-grade',
  templateUrl: './high-grade.component.html',
  styleUrls: ['./high-grade.component.scss']
})
export class HighGradeComponent implements OnInit {

  highGradeList: any = [];
  productDetail: any = [];
  showDialog: boolean = false;
  images: any[] = [];
  amount: number = 1;

  constructor(
    public firestore: Firestore,
  ) {
    this.getData();
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
          { "src": this.productDetail.productURL, },
          { "src": this.productDetail.boxURL, }
        ];
      }
    })
  }

  addToCart() {
    console.log('add to cart');
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
