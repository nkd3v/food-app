import React, { useState, useEffect } from 'react';

const Menu = () => {
    const [foodList, setFoodList] = useState([]);
  
    useEffect(() => {
      const fetchFoodData = async () => {
        try {
          const response = await fetch('https://api.dishdrop.pp.ua/api/menu');
          const data = await response.json();
          setFoodList(data);
        } catch (error) {
          console.error('Error fetching food data: ', error);
        }
      };
  
      fetchFoodData();
    }, []);
    

    return (
        <>
            <h1>Menu</h1>
            <div>
            <ul>
                {foodList.map((food) => (
                <li key={food.id}>
                    <img src={food.image} alt={food.foodName} style={{ width: '300px', height: '300px' }} />
                    <h2>{food.foodName}</h2>
                    <p>{food.restaurant}</p>
                    <p>{food.category}</p>
                    <p>${food.price}</p>
                </li>
                ))}
            </ul>
            </div>
        </>
    )
};

export default Menu;