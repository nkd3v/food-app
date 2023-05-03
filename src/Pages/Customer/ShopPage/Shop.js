import ShopCard from '../../../Components/ShopCard/ShopCard'
import SHA256 from 'crypto-js/sha256';
import './Shop.css'
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

const Shop = () => {
    const [shopList, setShopList] = useState([]);

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const response = await fetch('https://api.dishdrop.pp.ua/api/Menu/restaurantcanteenpair');
                const data = await response.json();
                setShopList(data);
            } catch (error) {
                console.error('Error fetching food data: ', error);
            }
        };

        fetchShopData();
    }, []);

    return (
        <div>
            <h1>เลือกร้านอาหาร</h1>
            <div className='ShopCard_container'>
                {shopList.length > 0 ? shopList.map(shop => (
                    <ShopCard key={v4()} id={SHA256(shop.restaurant).toString()} {...shop} />
                )) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
};

export default Shop;