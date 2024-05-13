import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeDataTableComponent } from './custome-data-table.component';
import {Product} from "../../../app/core/interfaces/products/products.interface";

describe('CustomeDataTableComponent', () => {
  let component: CustomeDataTableComponent;
  let fixture: ComponentFixture<CustomeDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: '2024-05-13',
      date_revision: '2024-05-13'
    };
    spyOn(component.delete, 'emit');
    component.onDelete(product);
    expect(component.delete.emit).toHaveBeenCalledWith(product);
  });

  it('should emit edit event', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: '2024-05-13',
      date_revision: '2024-05-13'
    };
    spyOn(component.edit, 'emit');
    component.onEdit(product);
    expect(component.edit.emit).toHaveBeenCalledWith(product);
  });

  it('should update currentPage on onPageChange', () => {
    const page = 2;
    component.onPageChange(page);
    expect(component.currentPage).toEqual(page);
  });

  it('should update pageSize and reset currentPage on onPageSizeChange', () => {
    const event = { target: { value: 10 }};
    component.currentPage = 2;
    component.onPageSizeChange(event);
    expect(component.pageSize).toEqual(event.target.value);
    expect(component.currentPage).toEqual(1);
  });
});
