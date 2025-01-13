import { increment, isValidNumber } from '../number';

describe('increment', () => {
  test('increments valid numbers', () => {
    expect(increment(0)).toBe(1);
    expect(increment(42)).toBe(43);
    expect(increment(-1)).toBe(0);
    expect(increment(1.5)).toBe(2.5);
  });

  test('handles numeric strings', () => {
    expect(increment('5')).toBe(6);
    expect(increment('-10')).toBe(-9);
    expect(increment('1.5')).toBe(2.5);
  });

  test('handles invalid inputs', () => {
    expect(increment(null)).toBeUndefined();
    expect(increment(undefined)).toBeUndefined();
    expect(increment('abc')).toBeUndefined();
    expect(increment(NaN)).toBeUndefined();
    expect(increment(Infinity)).toBeUndefined();
    expect(increment({})).toBeUndefined();
    expect(increment([])).toBeUndefined();
  });
});

describe('isValidNumber', () => {
  test('identifies valid numbers', () => {
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(42)).toBe(true);
    expect(isValidNumber(-1)).toBe(true);
    expect(isValidNumber(1.5)).toBe(true);
  });

  test('identifies invalid numbers', () => {
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-Infinity)).toBe(false);
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber('5')).toBe(false);
    expect(isValidNumber({})).toBe(false);
    expect(isValidNumber([])).toBe(false);
  });
});