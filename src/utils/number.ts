/**
 * Increments a numeric value by 1, with type checking and error handling
 * @param value - The value to increment
 * @returns The incremented value or undefined if input is invalid
 */
export function increment(value: unknown): number | undefined {
  // Handle null or undefined
  if (value == null) {
    return undefined;
  }

  // Convert to number if string
  const numValue = typeof value === 'string' ? Number(value) : value;

  // Validate it's a number
  if (typeof numValue !== 'number' || Number.isNaN(numValue)) {
    return undefined;
  }

  // Check for infinity
  if (!Number.isFinite(numValue)) {
    return undefined;
  }

  return numValue + 1;
}

/**
 * Type guard to check if a value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    !Number.isNaN(value) &&
    Number.isFinite(value)
  );
}

// Example usage with different scenarios:
/*
console.log(increment(5));          // Returns: 6
console.log(increment("5"));        // Returns: 6
console.log(increment(null));       // Returns: undefined
console.log(increment(undefined));   // Returns: undefined
console.log(increment("abc"));      // Returns: undefined
console.log(increment(Infinity));   // Returns: undefined
console.log(increment(NaN));        // Returns: undefined
*/