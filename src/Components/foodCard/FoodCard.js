import { useEffect, useState } from 'react'

import './FoodCard.css'
import { useShoppingCart } from '../../Context/ShoppingCartContext'
import ChangeRestaurantModal from '../ChangeRestaurantModal/ChangeRestaurantModal'

function FoodCard({ id, foodName, price, description, restaurant, category, image, restaurantAddress }) {
    let { cartItems, removeFromCart, increaseItemQuantity, setItemQuantity, clearCart } = useShoppingCart()

    const hasItemAdded = () => {
        return cartItems.find(item => item.menu.id === id)
    }

    const item = { id, foodName, price, description, restaurant, category, image, restaurantAddress }
    // create counter state
    const [quantity, setCounter] = useState(hasItemAdded() ? hasItemAdded().quantity : 1)


    // create handleIncrement function
    const handleIncrement = () => {
        setCounter(x => x + 1)
    }

    const handleDecrease = () => {
        setCounter(x => {
            if (x > 1) {
                return x - 1
            }
            return x
        })
    }

    useEffect(() => {
        
        if (hasItemAdded()) {
            setItemQuantity(item, quantity)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity])

    const hasItemFromOtherRestaurant = () => {
        console.log(cartItems)
        return cartItems.find(item => item.menu.restaurant !== restaurant)
    }

    const handleClick = () => {
        if (hasItemFromOtherRestaurant()) {
            clearCart()
        }
        if (!hasItemAdded()) {
            increaseItemQuantity(item, quantity)
        } else {
            removeFromCart(item)
        }
    }

    return (
        <div className='p-4 m-4 d-flex rounded foodCard_container_component'>
            <div className=''>
                <img className='food-img' src={image} alt={foodName} />
                <div className='d-flex justify-content-center mt-2'>
                    < button onClick={handleDecrease} className='button_amount_foodCard'>-</button>
                    <span className='counter_foodCard'>{quantity}</span>
                    <button onClick={handleIncrement} className='button_amount_foodCard'>+</button>
                </div>
            </div>
            {/* Menu description */}
            <div className='descript_container d-flex'>
                <h4>{foodName}</h4>
                <p>฿{price}</p>

                <p>{restaurant}</p>
                <p>{category}</p>
                <p>{description}</p>
                <div className='d-flex justify-content-center align-content-end'>
                    {!hasItemAdded() && (
                        <ChangeRestaurantModal handleClick={handleClick} price={price} quantity={quantity} hasItemFromOtherRestaurant={hasItemFromOtherRestaurant}/>
                    )}
                    {hasItemAdded() && (
                        <button className='button_removeFromCard' onClick={handleClick}>
                            Remove from cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FoodCard