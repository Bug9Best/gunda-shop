import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  public toolList: any = [];

  constructor(public firestore: Firestore) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    const firebase = collection(this.firestore, 'tool');
    getDocs(firebase).then((response) => {
      this.toolList = [...response.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })]
      console.log(this.toolList);
    })
  }
}
