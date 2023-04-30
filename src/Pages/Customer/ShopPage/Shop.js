import ShopCard from '../../../Components/ShopCard/ShopCard'
import SHA256 from 'crypto-js/sha256';
import './Shop.css'
import { useEffect, useState } from 'react';

const Shop = () => {
    const [foodList, setFoodList] = useState([]);
    const [shopList, setShopList] = useState([]);

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

        const myString = "example";
        const hash = SHA256(myString).toString();

        console.log(hash);
    }, []);

    useEffect(() => {
        if (foodList.length === 0) return

        const hash = SHA256(foodList[0].restaurant).toString()
        console.log(foodList[0].restaurant)
        console.log(hash);

        setShopList([...new Set(foodList.map(obj => obj.restaurant))])
    }, [foodList])

    return (
        <div>
            <h1>choose a restaurant</h1>
            <div className='ShopCard_container'>
                {shopList.length > 0 ? shopList.map(shop => (
                    <ShopCard key={SHA256(shop).toString()} id={SHA256(shop).toString()} name={shop} />
                )) : (
                    <p>   </p>
                )}
            </div>
        </div>
    )
};

export default Shop;