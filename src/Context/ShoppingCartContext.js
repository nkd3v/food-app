import { useContext, createContext, useState, useEffect } from 'react';

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartPorvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    

    function getItemQuantity(menu) {
        return cartItems.find(item => item.menu.id === menu.id)?.quantity || 0
    }

    function increaseItemQuantity(menu, quantity) {
        setCartItems(currItems => {
            if (currItems.find(item => item.menu.id === menu.id) === undefined) {
                return [...currItems, { menu, quantity }]
            } else {
                return currItems.map(item => {
                    if (item.menu.id === menu.id) {
                        return { menu: item.menu, quantity: item.quantity + quantity }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseItemQuantity(menu, quantity) {
        setCartItems(currItems => {
            if (currItems.find(item => item.menu.id === menu.id) === undefined) {
                return [...currItems, { menu, quantity }]
            } else {
                return currItems.map(item => {
                    if (item.menu.id === menu.id) {
                        return { menu: item.menu, quantity: item.quantity - quantity }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(menu) {
        setCartItems(currItems => {
            return currItems.filter(item => item.menu.id !== menu.id)
        })
    }

    return <ShoppingCartContext.Provider value={{ cartItems, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart }}>
        {children}
    </ShoppingCartContext.Provider>
}