import { useEffect, useState } from 'react';
import './CustomerList.css'
import CustomerDataTable from '../../../Components/customerdata/CustomerDataTable';

const CustomerList = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.dishdrop.pp.ua/api/order/unassigned', { credentials: 'include' });
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
                <CustomerDataTable orders={orderData} descriptionUrl={'takeorder'} />
            ) : <p>   </p>}
        </>
    )
};

export default CustomerList;