import {fakeAsync, TestBed} from '@angular/core/testing';

import { LoadingService } from './loading.service';
import {first, Subject} from "rxjs";

describe('LoadingService', () => {
  let service: LoadingService;
  let loaderSource: Subject<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
    loaderSource = service['loaderSource'] as Subject<boolean>; // Access private member
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show the loader', fakeAsync(() => {
    service.show();

    service.loader$.pipe(first()).subscribe(isVisible => {
      expect(isVisible).toBe(true);
    });
  }));

  it('should hide the loader', fakeAsync( () => {
    service.show();
    service.hide();

    service.loader$.pipe(first()).subscribe(isVisible => {
      expect(isVisible).toBe(false);
    });
  }));
});
