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

  highGradeList: any = [];
  realGradeList: any = [];
  masterGradeList: any = [];
  perfectGradeList: any = [];

  randomNum: number = 0;

  constructor(
    private firestore: Firestore,
  ) {
    // this.getImage();
    this.getHighGrade();
    this.getRealGrade();
    this.getMasterGrade();
    this.getPerfectGrade();
    this.random();
  }

  ngOnInit(): void {
  }

  // getImage() {
  //   const firebase = collection(this.firestore, 'assets');
  //   getDocs(firebase).then((response) => {
  //     this.imgList = [...response.docs.map((item) => {
  //       return { ...item.data(), id: item.id }
  //     })]
  //     console.log(this.imgList[0].src);
  //   })
  // }

  getHighGrade() {
    const firebase = collection(this.firestore, 'high-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.highGradeList.push(item.data()['productURL']);
      })
    })
  }

  getRealGrade() {
    const firebase = collection(this.firestore, 'real-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.realGradeList.push(item.data()['productURL']);
      })
    })
  }

  getMasterGrade() {
    const firebase = collection(this.firestore, 'master-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.masterGradeList.push(item.data()['productURL']);
      })
    })
  }

  getPerfectGrade() {
    const firebase = collection(this.firestore, 'perfect-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.perfectGradeList.push(item.data()['productURL']);
      })
    })
  }

  random() {
    this.randomNum = Math.floor(Math.random() * 16);
    console.log(this.randomNum);
  }
}
