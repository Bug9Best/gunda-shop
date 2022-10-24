import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-high-grade',
  templateUrl: './high-grade.component.html',
  styleUrls: ['./high-grade.component.scss']
})
export class HighGradeComponent implements OnInit {
  public highGradeList: any = [];

  constructor(public firestore: Firestore) {
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
}
