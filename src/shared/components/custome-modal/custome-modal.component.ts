import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-custome-modal',
  standalone: true,
  imports: [],
  templateUrl: './custome-modal.component.html',
  styleUrl: './custome-modal.component.scss'
})
export class CustomeModalComponent {
  @Input() isOpen: boolean = false;
}
