import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgList: any = [];
  landing = [
    {
      image: 'https://cdn.discordapp.com/attachments/1021435603688099913/1043479128810209360/unknown.png'
    },
    {
      image: 'https://cdn.discordapp.com/attachments/1021435603688099913/1043467540044709898/unknown.png'
    },
    {
      image: 'https://cdn.discordapp.com/attachments/1021435603688099913/1043477424836448256/unknown.png'
    },
  ]

  highGradeURL: any = [];
  highGradeName: any = [];

  realGradeURL: any = [];
  realGradeName: any = [];

  masterGradeURL: any = [];
  masterGradeName: any = [];
  
  perfectGradeURL: any = [];
  perfectGradeName: any = [];
  
  toolURL: any = [];
  toolName: any = [];

  randomNum: number = 0;

  constructor(
    private firestore: Firestore,
  ) {
    this.getHighGrade();
    this.getRealGrade();
    this.getMasterGrade();
    this.getPerfectGrade();
    this.getToolGrade();
    this.random();
  }

  ngOnInit(): void {
  }

  getHighGrade() {
    const firebase = collection(this.firestore, 'high-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.highGradeURL.push(item.data()['productURL']);
        this.highGradeName.push(item.data()['name']);
      })
    })
  }

  getRealGrade() {
    const firebase = collection(this.firestore, 'real-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.realGradeURL.push(item.data()['productURL']);
        this.realGradeName.push(item.data()['name']);      })
    })
  }

  getMasterGrade() {
    const firebase = collection(this.firestore, 'master-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.masterGradeURL.push(item.data()['productURL']);
        this.masterGradeName.push(item.data()['name']);      })
    })
  }

  getPerfectGrade() {
    const firebase = collection(this.firestore, 'perfect-grade');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.perfectGradeURL.push(item.data()['productURL']);
        this.perfectGradeName.push(item.data()['name']);      })
    })
  }

  getToolGrade() {
    const firebase = collection(this.firestore, 'tool');
    getDocs(firebase).then((response) => {
      response.docs.map((item) => {
        this.toolURL.push(item.data()['productURL']);
        this.toolName.push(item.data()['name']);      })
    })
  }


  random() {
    this.randomNum = Math.floor(Math.random() * 16);
  }
}
