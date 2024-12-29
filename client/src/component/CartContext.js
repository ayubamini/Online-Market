import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.ProductName === product.ProductName);
            if (itemExists) {
                return prevItems.map(item =>
                    item.ProductName === product.ProductName ? { ...item, Quantity: item.Quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, Quantity: 1 }];
        });
    };

    const removeFromCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.ProductName === product.ProductName);
            if (existingItem && existingItem.Quantity > 1) {
                return prevItems.map(item =>
                    item.ProductName === product.ProductName ? { ...item, Quantity: item.Quantity - 1 } : item
                );
            } else {
                return prevItems.filter(item => item.ProductName !== product.ProductName);
            }
        });
    };

    const emptyCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
