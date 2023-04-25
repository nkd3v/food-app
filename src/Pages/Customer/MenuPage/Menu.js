import React, { useState, useEffect } from 'react';
import FoodCard from '../../../Components/foodCard/FoodCard';
import './Menu.css' ;

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
      <div className = "foodCard_container">
          {foodList.map((food) => (
            <FoodCard key={food.id} {...food} />
          ))}
      </div>
    </>
  )
};

export default Menu;