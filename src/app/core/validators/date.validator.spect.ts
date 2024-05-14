import { FormControl } from '@angular/forms';
import {actualDateValidator, futureDateValidator} from "./date.validator";

describe('Date Validators', () => {
  describe('actualDateValidator', () => {
    it('should return null if control value is null', () => {
      const control = new FormControl(null);
      const result = actualDateValidator(control);
      expect(result).toBeNull();
    });

    it('should return null if date is today or in the past', () => {
      const control = new FormControl('2024-05-13'); // Current date: 2024-05-13
      const result = actualDateValidator(control);
      expect(result).toBeNull();
    });

    it('should return error if date is in the future', () => {
      const control = new FormControl('2024-05-14'); // Current date: 2024-05-13
      const result = actualDateValidator(control);
      expect(result).toEqual({ 'fechaActualInvalida': true });
    });
  });

  describe('futureDateValidator', () => {
    it('should return error if date is not a valid date', () => {
      const control = new FormControl('invalid-date');
      const result = futureDateValidator(control);
      expect(result).toEqual({ 'fechaFuturaInvalida': true });
    });

    it('should return error if date is today or in the past', () => {
      const control = new FormControl('2024-05-13'); // Current date: 2024-05-13
      const result = futureDateValidator(control);
      expect(result).toEqual({ 'fechaFuturaInvalida': true });
    });

    it('should return null if date is in the future', () => {
      const control = new FormControl('2024-05-14'); // Current date: 2024-05-13
      const result = futureDateValidator(control);
      expect(result).toBeNull();
    });
  });
});
