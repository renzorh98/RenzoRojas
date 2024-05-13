import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-custome-form-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './custome-form-input.component.html',
  styleUrl: './custome-form-input.component.scss'
})
export class CustomeFormInputComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;


  @Output() blur = new EventEmitter<FocusEvent>()

  onBlur(evt: FocusEvent){
    this.blur.emit(evt)
  }
}
