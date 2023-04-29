import { useEffect, useState } from 'react';
import TakenOrderData from './TakenOrderData';
import './TakenOrder.css'

const TakenOrder = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.dishdrop.pp.ua/api/order');
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        orderData.length > 0 ? (
            <div>
                <h1>My Order List</h1>
                <div className='list_container'>
                    <div className="col-sm-2 col-md-2 col-lg-2 border">
                        <h4>No.</h4>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 border">
                        <h4>Restaurant</h4>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 border">
                        <h4>Destination</h4>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2 border">
                        <h4>Description</h4>
                    </div>

                    {orderData.map(
                        (order, index) => (
                            <TakenOrderData key={index} id={index} order={order} />
                        )
                    )}
                </div>
            </div>
        ) : <p>Loading...</p>
    )
};

export default TakenOrder;