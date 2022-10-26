import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-master-grade',
  templateUrl: './master-grade.component.html',
  styleUrls: ['./master-grade.component.scss']
})
export class MasterGradeComponent implements OnInit {
  public masterGradeList: any = [];

  constructor(public firestore: Firestore) {
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
      console.log(this.masterGradeList);
    })
  }
}