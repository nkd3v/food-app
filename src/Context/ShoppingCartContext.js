import { useContext, createContext, useState, useEffect } from 'react';

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartPorvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCartItems = localStorage.getItem('cartItems');
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    })


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

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

    function setItemQuantity(menu, quantity) {
        setCartItems(currItems => {
            if (currItems.find(item => item.menu.id === menu.id) === undefined) {
                return [...currItems, { menu, quantity }]
            } else {
                return currItems.map(item => {
                    if (item.menu.id === menu.id) {
                        return { menu: item.menu, quantity }
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

    function clearCart() {
        setCartItems([])
    }

    return <ShoppingCartContext.Provider value={{ cartItems, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart, setItemQuantity, clearCart }}>
        {children}
    </ShoppingCartContext.Provider>
}