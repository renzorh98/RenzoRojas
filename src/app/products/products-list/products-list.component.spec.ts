import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import {NotificationType} from "../../core/interfaces/notification/notification.interface";
import {Product} from "../../core/interfaces/products/products.interface";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {ProductsService} from "../../core/api/products/products.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {LoadingService} from "../../core/services/loading/loading.service";


describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts', 'deleteProduct']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['show']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', date_release: '2024-01-01', date_revision: '2024-01-02', description: 'desc', logo: 'logo' },
      { id: '2', name: 'Product 2', date_release: '2024-02-01', date_revision: '2024-02-02', description: 'desc', logo: 'logo' }
    ];
    productsServiceSpy.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', date_release: '2024-01-01', date_revision: '2024-01-02', description: 'desc', logo: 'logo' },
      { id: '2', name: 'Product 2', date_release: '2024-02-01', date_revision: '2024-02-02', description: 'desc', logo: 'logo' }
    ];

    component.ngOnInit();
    expect(productsServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to add product', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.goToAddProduct();
    expect(routerSpy).toHaveBeenCalledWith(['products/add']);
  });

  it('should navigate to edit product', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const product: Product = { id: '1', description: 'desc', logo: 'logo', name: 'Product 1', date_release: '2024-01-01', date_revision: '2024-01-02' };
    component.onEdit(product);
    expect(routerSpy).toHaveBeenCalledWith(['products/edit'], { state: { product } });
  });

  it('should open modal and set elemToDelete on delete', () => {
    const product: Product = { id: '1', description: 'desc', logo: 'logo', name: 'Product 1', date_release: '2024-01-01', date_revision: '2024-01-02' };
    component.onDelete(product);
    expect(component.openModal).toBeTrue();
    expect(component.elemToDelete).toEqual({id: '1', name: 'Product 1'});
  });

  it('should call deleteProduct, show notification, hide modal, reload products on callToDelete', () => {
    const product = { id: '1', name: 'Product 1', date_release: '2024-01-01', date_revision: '2024-01-02' };
    productsServiceSpy.deleteProduct.and.returnValue(of(''));
    const reloadSpy = spyOn(component, 'ngOnInit');
    component.callToDelete(product);
    expect(productsServiceSpy.deleteProduct).toHaveBeenCalledWith(product.id);
    expect(notificationServiceSpy.show).toHaveBeenCalledWith({
      message: `Se borro el producto "${product.name}"`,
      type: NotificationType.SUCCESS
    });
    expect(component.openModal).toBeFalse();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalled();
  });
});
