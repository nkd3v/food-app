import { useState } from 'react'

import { Image } from 'react-bootstrap'

import './FoodCard.css'

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
        <div className='p-4 m-4 d-flex justify-content-center rounded shadow foodCard_container_component'>
            <div className=''>
                <img src={image} alt={foodName} width="200px"/>
                <div className='d-flex justify-content-center mt-2'>
                     < button onClick={handleDecrease} className='button_amount_foodCard'>-</button>
                     <span className='counter_foodCard'>{counter}</span>
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
                <button className='button_addToCard'>
                        Add to cart ฿{price * counter}
                </button>
            </div>
        </div>
        // <div className='d-flex shadow-sm'>
        //     <Image
        //         src={image}
        //         width="250px"
        //         style={{ objectFit: "cover" }}
        //         alt={foodName}
        //     />
        //     <div style={{ flexGrow: 1 }}>
                // <div>
                //     <h2>{foodName}</h2>
                //     <p>฿{price}</p>
                // </div>
                // <div>
                //     <p>{restaurant}</p>
                //     <p>{category}</p>
                //     <p>{description}</p>
                // </div>
        //         <div>
        //             <button onClick={handleDecrease}>-</button>
        //             <span style={{ margin: '0px 8px' }}>{counter}</span>
        //             <button onClick={handleIncrement}>+</button>
        //         </div>
        //         <div>
                    // <button>
                    //     Add to cart ฿{price * counter}
                    // </button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default FoodCard