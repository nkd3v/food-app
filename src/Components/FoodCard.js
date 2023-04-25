import { useState } from 'react'

import { Image } from 'react-bootstrap'

function FoodCard({ id, foodName, price, description, restaurant, category, image }) {
    // create counter state
    const [counter, setCounter] = useState(0)

    // create handleIncrement function
    const handleIncrement = () => {
        setCounter(counter + 1)
    }

    const handleDecrease = () => {
        setCounter(counter - 1)
    }

    return (
        <div className='d-flex shadow-sm'>
            <Image
                src={image}
                width="250px"
                style={{ objectFit: "cover" }}
                alt={foodName}
            />
            <div style={{ flexGrow: 1 }}>
                <div>
                    <h2>{foodName}</h2>
                    <p>฿{price}</p>
                </div>
                <div>
                    <p>{restaurant}</p>
                    <p>{category}</p>
                    <p>{description}</p>
                </div>
                <div>
                    <button onClick={handleDecrease}>-</button>
                    <span style={{ margin: '0px 8px' }}>{counter}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
                <div>
                    <button>
                        Add to cart ฿{price * counter}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard