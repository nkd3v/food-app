import { useState } from 'react'

import './FoodCard.css'
import { useShoppingCart } from '../../Context/ShoppingCartContext'

function FoodCard({ id, foodName, price, description, restaurant, category, image }) {
    const item = { id, foodName, price, description, restaurant, category, image }
    // create counter state
    const [quantity, setCounter] = useState(0)
    let  { increaseItemQuantity } = useShoppingCart()
    

    // create handleIncrement function
    const handleIncrement = () => {
        setCounter(quantity + 1)
    }

    const handleDecrease = () => {
        setCounter(quantity - 1)
    }

    return (
        <div className='p-4 m-4 d-flex justify-content-center rounded shadow foodCard_container_component'>
            <div className=''>
                <img src={image} alt={foodName} width="200px"/>
                <div className='d-flex justify-content-center mt-2'>
                     < button onClick={handleDecrease} className='button_amount_foodCard'>-</button>
                     <span className='counter_foodCard'>{quantity}</span>
                     <button onClick={handleIncrement} className='button_amount_foodCard'>+</button>
                 </div>
            </div>
            {/* Menu description */}
            <div className='descript_container'>
                <h4>{foodName}</h4>
                <p>฿{price}</p>

                <p>{restaurant}</p>
                <p>{category}</p>
                <p>{description}</p>
                <button className='button_addToCard' onClick={() => increaseItemQuantity(item, quantity)}>
                        Add to cart ฿{price * quantity}
                </button>
            </div>
        </div>
    )
}

export default FoodCard