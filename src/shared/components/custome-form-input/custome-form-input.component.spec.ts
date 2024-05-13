import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeFormInputComponent } from './custome-form-input.component';

describe('CustomeFormInputComponent', () => {
  let component: CustomeFormInputComponent;
  let fixture: ComponentFixture<CustomeFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeFormInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
