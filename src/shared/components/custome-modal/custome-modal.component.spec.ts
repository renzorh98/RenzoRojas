import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeModalComponent } from './custome-modal.component';

describe('CustomeModalComponent', () => {
  let component: CustomeModalComponent;
  let fixture: ComponentFixture<CustomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
