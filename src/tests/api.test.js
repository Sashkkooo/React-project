import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock API services
const mongoAPI = {
  getProducts: async () => {
    const response = await fetch('http://localhost:8000/api/products');
    return response.json();
  },
  getOrderById: async (orderId) => {
    const response = await fetch(`http://localhost:8000/api/orders/${orderId}`);
    return response.json();
  },
  createOrder: async (orderData) => {
    const response = await fetch('http://localhost:8000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },
};

describe('MongoDB API Services', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products', async () => {
      const mockProducts = [
        { id: 1, name: 'T-Shirt', price: 29.99 },
        { id: 2, name: 'Hoodie', price: 49.99 },
      ];

      global.fetch.mockResolvedValueOnce({
        json: async () => mockProducts,
      });

      const result = await mongoAPI.getProducts();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/products'
      );
      expect(result).toEqual(mockProducts);
    });

    it('should handle fetch error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(mongoAPI.getProducts()).rejects.toThrow('Network error');
    });
  });

  describe('getOrderById', () => {
    it('should fetch order by ID', async () => {
      const mockOrder = {
        id: '123',
        userId: '456',
        totalPrice: 79.98,
        status: 'pending',
      };

      global.fetch.mockResolvedValueOnce({
        json: async () => mockOrder,
      });

      const result = await mongoAPI.getOrderById('123');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/orders/123'
      );
      expect(result).toEqual(mockOrder);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const orderData = {
        userId: '456',
        products: [{ productId: '1', quantity: 2 }],
        totalPrice: 59.98,
      };

      const mockResponse = { id: '789', ...orderData, status: 'pending' };

      global.fetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      const result = await mongoAPI.createOrder(orderData);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/orders',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
