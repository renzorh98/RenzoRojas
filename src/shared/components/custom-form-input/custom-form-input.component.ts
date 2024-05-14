import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-custom-form-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './custom-form-input.component.html',
  styleUrl: './custom-form-input.component.scss'
})
export class CustomFormInputComponent {
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
