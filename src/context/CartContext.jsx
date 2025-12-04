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

  const removeFromCart = useCallback((index) => {
    setCart((prev) => {
      const updated = [...prev];
      updated.splice(index, 1); // премахва само елемента на дадения индекс
      return updated;
    });
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

  const saved = useMemo(() => {
    let discount = 0;

    // Магнити
    const magnets = cart.filter(p => p.category === "magnets");
    const magnetCount = magnets.reduce((sum, p) => sum + (p.qty ?? 1), 0);
    discount += Math.floor(magnetCount / 2) * 1.50;

    // Картички
    const cards = cart.filter(p => p.category === "cards");
    const cardCount = cards.reduce((sum, p) => sum + (p.qty ?? 1), 0);
    discount += Math.floor(cardCount / 2) * 2.00;

    return discount;
  }, [cart]);

  const finalPrice = useMemo(
    () => totalPrice - saved,
    [totalPrice, saved]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
      saved,
      finalPrice
    }),
    [cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice, saved, finalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
