import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.css']
})
export class ButtonActionComponent implements OnInit {
  @Output() addEvent = new EventEmitter<boolean>();
  @Output() editEvent = new EventEmitter<boolean>();
  @Output() showEvent = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.addEvent.emit(true);

  }
  edit(){
    this.editEvent.emit(true);

  }
  delete(){
    this.deleteEvent.emit(true);

  }
  show(){
    this.showEvent.emit(true);
  }

}
