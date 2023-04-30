import React, { useState, useEffect } from 'react';
import FoodCard from '../../../Components/foodCard/FoodCard';
import './Menu.css';
import { useParams } from 'react-router-dom';
import { SHA256 } from 'crypto-js';

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const { id } = useParams()

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
      <h1>Menu</h1>{foodList.length > 0 ? (
        <div className="foodCard_container">
          {foodList.map((food) => (
            SHA256(food.restaurant).toString() === id ? (
              <FoodCard key={food.id} {...food} />
            ) : (
              null
            )
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Menu;