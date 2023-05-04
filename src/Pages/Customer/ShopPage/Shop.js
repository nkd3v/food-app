import ShopCard from '../../../Components/ShopCard/ShopCard'
import SHA256 from 'crypto-js/sha256';
import './Shop.css'
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import FilterDropdown from '../../../Components/FilterDropdown/FilterDropdown';
import { Container } from 'react-bootstrap';

const Shop = () => {
    const [shopList, setShopList] = useState([]);
    const [allShopList, setAllShopList] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const response = await fetch('https://api.dishdrop.pp.ua/api/Menu/restaurantcanteenpair');
                const data = await response.json();
                setShopList(data);
                setAllShopList(data);
                setOptions(['ทั้งหมด', ...new Set(data.map(shop => shop.canteen))]);
            } catch (error) {
                console.error('Error fetching food data: ', error);
            }
        };

        fetchShopData();
    }, []);

    const handleFilter = (filterOption) => {
        if (filterOption === 'ทั้งหมด') {
            setShopList(allShopList);
        } else {
            setShopList(allShopList.filter(shop => shop.canteen === filterOption));
        }
    }

    return (
        <div>
            <h1>เลือกร้านอาหาร</h1>
            <Container className="d-flex justify-content-end">
                <FilterDropdown onSelect={handleFilter} options={options} />
            </Container>
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