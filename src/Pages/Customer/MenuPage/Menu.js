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

  useEffect(() => {
    console.log(foodList)
  }, [foodList])

  return (
    <>
      <h1>{foodList?.find((food) => (SHA256(food.restaurant).toString() === id))?.restaurant}</h1>
      <div className='foodCtn_container d-flex justify-content-center'>
        <div className='foodList_container d-flex justify-content-center'>
          {foodList.length > 0 ? (
            <div className="foodCard_container d-flex">
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
        </div>
      </div>
    </>
  );
}

export default Menu;