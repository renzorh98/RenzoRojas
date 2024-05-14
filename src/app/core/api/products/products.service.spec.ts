import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { NotificationService } from '../../services/notification/notification.service';
import {ROUTE_PRODUCTS} from "../../../../shared/http/routes";

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['show']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        { provide: NotificationService, useValue: notificationSpy }
      ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle getProducts() successfully', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', description: '...', logo: '...', date_release: '...', date_revision: '...' },
      { id: '2', name: 'Product 2', description: '...', logo: '...', date_release: '...', date_revision: '...' },
    ];
    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
    const req = httpMock.expectOne(`${ROUTE_PRODUCTS}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle getProducts() error', () => {
    const errorMessage = 'Error fetching products';
    service.getProducts().subscribe({
      error: (err) => {
        expect(err).toEqual(errorMessage);
      }
    });
    const req = httpMock.expectOne(`${ROUTE_PRODUCTS}`);
    req.error(new ErrorEvent(errorMessage));
    expect(notificationServiceSpy.show).toHaveBeenCalled()
  });

  it('should handle postNewProduct() catch error', () => {
    const errorMessage = 'Error creating product';

    service.postNewProduct({id: '1', name: '', description: '', logo: '', date_revision: '', date_release: ''}).subscribe({
      error: (err) => {
        expect(err).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${ROUTE_PRODUCTS}`);
    req.error(new ErrorEvent(errorMessage));
    expect(notificationServiceSpy.show).toHaveBeenCalled()
  });

  it('should handle updateProduct() catch error', () => {
    const errorMessage = 'Error updating product';

    service.updateProduct({id: '1', name: '', description: '', logo: '', date_revision: '', date_release: ''}).subscribe({
      error: (err) => {
        expect(err).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${ROUTE_PRODUCTS}`);
    req.error(new ErrorEvent(errorMessage));
    expect(notificationServiceSpy.show).toHaveBeenCalled()
  });

  it('should handle deleteProduct() catch error', () => {
    const errorMessage = 'Error updating product';

    service.deleteProduct('123').subscribe({
      error: (err) => {
        expect(err).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${ROUTE_PRODUCTS}?id=123`);
    req.error(new ErrorEvent(errorMessage));
    expect(notificationServiceSpy.show).toHaveBeenCalled()
  });

});
