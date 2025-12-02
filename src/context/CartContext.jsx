import { createContext, useState, useMemo, useCallback } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item with quantity merging by id
  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx === -1) {
        return [...prev, { ...product, qty }];
      }
      const updated = [...prev];
      updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = useMemo(
    () => cart.reduce((sum, p) => sum + (p.qty ?? 1), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, p) => sum + (p.price ?? 0) * (p.qty ?? 1), 0),
    [cart]
  );

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }),
    [cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
