import { useEffect, useState } from 'react';
import CustomerData from '../../../Components/customerdata/CustomerData'
import './CustomerList.css'

const CustomerList = () => {
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
        <div>
            <h1>Customer List</h1>
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

                {console.log({orderData}) || orderData?.map?.(
                    (order, index) => (
                        <CustomerData id={index} order={order} />
                    )
                )}
            </div>
        </div>
    )
};

export default CustomerList;