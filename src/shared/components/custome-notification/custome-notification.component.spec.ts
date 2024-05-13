import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeNotificationComponent } from './custome-notification.component';

describe('CustomeNotificationComponent', () => {
  let component: CustomeNotificationComponent;
  let fixture: ComponentFixture<CustomeNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
