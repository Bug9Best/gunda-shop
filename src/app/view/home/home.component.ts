import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';
import { query, orderBy, limit } from "firebase/firestore";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgList: any = [];

  constructor(
    private firestore: Firestore,
  ) {
    this.getImage();
  }

  ngOnInit(): void {
  }

  getImage() {
    const firebase = collection(this.firestore, 'assets');
    getDocs(firebase).then((response) => {
      this.imgList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
      console.log(this.imgList[0].src);
    })
  }
}
