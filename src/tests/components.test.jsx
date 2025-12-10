import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock component for testing
function ProductCard({ product, onAddToCart }) {
  return (
    <div data-testid="product-card">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

function ReviewForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="number" placeholder="Rating" min="1" max="5" />
      <textarea placeholder="Write your review..." />
      <button type="submit">Submit Review</button>
    </form>
  );
}

describe('ProductCard Component', () => {
  it('should render product name and price', () => {
    const product = { name: 'T-Shirt', price: 29.99 };
    render(<ProductCard product={product} onAddToCart={() => {}} />);

    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('should call onAddToCart when button clicked', () => {
    const product = { id: 1, name: 'T-Shirt', price: 29.99 };
    const mockAddToCart = vi.fn();

    render(
      <ProductCard product={product} onAddToCart={mockAddToCart} />
    );

    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(product);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  it('should render with testid', () => {
    const product = { name: 'T-Shirt', price: 29.99 };
    render(<ProductCard product={product} onAddToCart={() => {}} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});

describe('ReviewForm Component', () => {
  it('should render form inputs', () => {
    render(
      <ReviewForm onSubmit={() => {}} />
    );

    expect(screen.getByPlaceholderText('Rating')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your review...')).toBeInTheDocument();
    expect(screen.getByText('Submit Review')).toBeInTheDocument();
  });

  it('should call onSubmit when form submitted', () => {
    const mockSubmit = vi.fn((e) => e.preventDefault());

    render(
      <ReviewForm onSubmit={mockSubmit} />
    );

    const form = screen.getByText('Submit Review').closest('form');
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalled();
  });
});
