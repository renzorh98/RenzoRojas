import {Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'app-custome-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './custome-dropdown.component.html',
  styleUrl: './custome-dropdown.component.scss'
})
export class CustomeDropdownComponent {
  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()
  isOpen = false

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isOpen) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isOpen = false;
    }
  }

  onEditClicked(){
    this.edit.emit()
    this.isOpen = false
  }

  onDeleteClicked(){
    this.delete.emit()
    this.isOpen = false
  }
}
