import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {ProductsAddComponent} from './products-add.component';
import {of} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductsService} from "../../core/api/products/products.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {LoadingService} from "../../core/services/loading/loading.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductsAddComponent', () => {
  let component: ProductsAddComponent;
  let fixture: ComponentFixture<ProductsAddComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let router: Router;

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['postNewProduct', 'updateProduct', 'validateId']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['show']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {provide: ProductsService, useValue: productsServiceSpy},
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: LoadingService, useValue: loadingServiceSpy},
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.productForm).toBeTruthy();
    expect(component.idControl).toBeTruthy();
    expect(component.nameControl).toBeTruthy();
    expect(component.descriptionControl).toBeTruthy();
    expect(component.logoControl).toBeTruthy();
    expect(component.dateReleaseControl).toBeTruthy();
    expect(component.dateRevisionControl).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.releaseDateSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.releaseDateSub.unsubscribe).toHaveBeenCalled();
  });

  it('should navigate to product list', () => {
    spyOn(router, 'navigate');
    component.goToList();
    expect(router.navigate).toHaveBeenCalledWith(['products']);
  });

  it('should call postNewProduct when not editing', fakeAsync(() => {
    const exampleValue = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'logo.png',
      date_release: '2024-05-13',
      date_revision: '2024-05-14'
    }
    component.productForm.setValue({...exampleValue})
    productsServiceSpy.postNewProduct.and.returnValue(of({
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'logo.png',
      date_release: '2024-05-13',
      date_revision: '2024-05-14'
    }));
    component.onSubmit();
    expect(productsServiceSpy.postNewProduct).toHaveBeenCalledWith(exampleValue);
    expect(notificationServiceSpy.show).toHaveBeenCalledWith({type: jasmine.any(String), message: jasmine.any(String)});
  }));

  it('should call updateProduct when editing', () => {
    const exampleValue = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'logo.png',
      date_release: '2024-05-13',
      date_revision: '2024-05-14'
    }
    component.productForm.setValue({...exampleValue})
    productsServiceSpy.updateProduct.and.returnValue(of({
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'logo.png',
      date_release: '2024-05-13',
      date_revision: '2024-05-14',
    }));
    component.isEdit = true;
    component.onSubmit();
    expect(productsServiceSpy.updateProduct).toHaveBeenCalledWith(exampleValue);
    expect(notificationServiceSpy.show).toHaveBeenCalledWith({type: jasmine.any(String), message: jasmine.any(String)});
  });

  it('should call validateId and set error if id exists', fakeAsync(() => {
    component.idControl.setValue('1234')
    productsServiceSpy.validateId.and.returnValue(of(true));
    component.validateId();
    expect(productsServiceSpy.validateId).toHaveBeenCalledWith(component.idControl.value);
    expect(component.idControl?.errors?.['idExists']).toBe(true)

  }));

  it('should not set error if id does not exist', fakeAsync(() => {
    const spySetErrors = spyOn(component.idControl, 'setErrors')
    productsServiceSpy.validateId.and.returnValue(of(false));
    component.validateId();
    expect(spySetErrors).not.toHaveBeenCalled();
  }));
});
