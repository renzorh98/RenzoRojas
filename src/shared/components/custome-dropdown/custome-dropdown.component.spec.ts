import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeDropdownComponent } from './custome-dropdown.component';

describe('CustomeDropdownComponent', () => {
  let component: CustomeDropdownComponent;
  let fixture: ComponentFixture<CustomeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    component.isOpen = false;
    component.toggleDropdown();
    expect(component.isOpen).toBe(true);

    component.toggleDropdown();
    expect(component.isOpen).toBe(false);
  });

  it('should emit edit event and close dropdown', () => {
    spyOn(component.edit, 'emit');
    component.onEditClicked();
    expect(component.edit.emit).toHaveBeenCalled();
    expect(component.isOpen).toBe(false);
  });

  it('should emit delete event and close dropdown', () => {
    spyOn(component.delete, 'emit');
    component.onDeleteClicked();
    expect(component.delete.emit).toHaveBeenCalled();
    expect(component.isOpen).toBe(false);
  });
});
