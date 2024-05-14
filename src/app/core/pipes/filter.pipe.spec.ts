import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if value is null', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('should return value if args is not provided', () => {
    const pipe = new FilterPipe();
    const value = [{ name: 'Product 1' }, { name: 'Product 2' }];
    const result = pipe.transform(value);
    expect(result).toEqual(value);
  });

  it('should filter the value based on args', () => {
    const pipe = new FilterPipe();
    const value = [{ name: 'Product 1' }, { name: 'Product 2' }, { name: 'Another Product' }];
    const args = 'another';
    const result = pipe.transform(value, args);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Another Product');
  });

  it('should filter the value based on args (case insensitive)', () => {
    const pipe = new FilterPipe();
    const value = [{ name: 'Product 1' }, { name: 'Product 2' }, { name: 'Another Product' }];
    const args = 'PrOdUcT';
    const result = pipe.transform(value, args);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('Product 1');
    expect(result[1].name).toBe('Product 2');
    expect(result[2].name).toBe('Another Product');
  });

  it('should return empty array if no match found', () => {
    const pipe = new FilterPipe();
    const value = [{ name: 'Product 1' }, { name: 'Product 2' }];
    const args = 'Another';
    const result = pipe.transform(value, args);
    expect(result.length).toBe(0);
  });

  it('should return empty array if value is empty', () => {
    const pipe = new FilterPipe();
    const value: any[] = [];
    const args = 'Product';
    const result = pipe.transform(value, args);
    expect(result.length).toBe(0);
  });
});
