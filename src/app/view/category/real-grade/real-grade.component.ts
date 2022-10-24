import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-real-grade',
  templateUrl: './real-grade.component.html',
  styleUrls: ['./real-grade.component.scss']
})
export class RealGradeComponent implements OnInit {
  public realGradeList: any = [];

  constructor(public firestore: Firestore) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    const firebase = collection(this.firestore, 'real-grade');
    getDocs(firebase).then((response) => {
      this.realGradeList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
      console.log(this.realGradeList);
    })
  }
}