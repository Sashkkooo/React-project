import { describe, it, expect } from 'vitest';

// Example utility test - Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Example utility test - Price formatting
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Example utility test - Calculate order total
export const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

describe('Email Validation', () => {
  it('should validate correct email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('should reject invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('should reject email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });
});

describe('Price Formatting', () => {
  it('should format price correctly', () => {
    expect(formatPrice(29.99)).toBe('$29.99');
  });

  it('should format whole numbers with decimals', () => {
    expect(formatPrice(100)).toBe('$100.00');
  });
});

describe('Order Total Calculation', () => {
  it('should calculate total for single item', () => {
    const items = [{ price: 20, quantity: 1 }];
    expect(calculateOrderTotal(items)).toBe(20);
  });

  it('should calculate total for multiple items', () => {
    const items = [
      { price: 20, quantity: 2 },
      { price: 15, quantity: 1 },
    ];
    expect(calculateOrderTotal(items)).toBe(55);
  });

  it('should return 0 for empty cart', () => {
    expect(calculateOrderTotal([])).toBe(0);
  });
});
