import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-perfect-grade',
  templateUrl: './perfect-grade.component.html',
  styleUrls: ['./perfect-grade.component.scss']
})
export class PerfectGradeComponent implements OnInit {
  public perfectGradeList: any = [];

  constructor(public firestore: Firestore) {
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
      console.log(this.perfectGradeList);
    })
  }
}
