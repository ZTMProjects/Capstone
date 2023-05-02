import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCardOpen: false,
  setIsCardOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
