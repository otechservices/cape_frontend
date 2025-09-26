import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }
}
