import { useEffect, useState } from 'react';
import './OrderList.css'
import CustomerDataTable from '../../../Components/customerdata/CustomerDataTable';

const OrderList = () => {
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
        <>
        <h1>Orders List</h1>
        {orderData.length > 0 ? (
            <CustomerDataTable orders={orderData} descriptionUrl={'tracking'} />
        ) : <p>   </p>}
        </>
    )
};

export default OrderList;