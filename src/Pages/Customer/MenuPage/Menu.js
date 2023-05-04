import React, { useState, useEffect } from 'react';
import FoodCard from '../../../Components/foodCard/FoodCard';
import './Menu.css';
import { useParams } from 'react-router-dom';

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(`https://api.dishdrop.pp.ua/api/menu/restaurant/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        setFoodList(data);
      } catch (error) {
        console.error('Error fetching food data: ', error);
      }
    };

    fetchFoodData();
  }, [id]);

  useEffect(() => {
    console.log(foodList)
  }, [foodList])

  return (
    <>
      <h1>{foodList?.[0]?.restaurant}</h1>
      <div className='foodCtn_container d-flex justify-content-center'>
        <div className='foodList_container d-flex justify-content-center'>
          {foodList.length > 0 ? (
            <div className="foodCard_container d-flex">
              {foodList.map((food) => <FoodCard key={food.id} {...food} />)}
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