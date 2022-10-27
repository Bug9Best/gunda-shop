import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() display?: boolean;
  @Output() closeDialog = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  close() {
    return this.closeDialog.emit();
  }
}
