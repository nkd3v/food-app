import { useEffect, useState } from 'react';
import './CustomerList.css'
import CustomerDataTable from '../../../Components/customerdata/CustomerDataTable';

const CustomerList = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.dishdrop.pp.ua/api/order/unassigned', { credentials: 'include' });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>Orders List</h1>
            {orders === null && <p>Loading...</p>}
            {orders?.length === 0 && <p>No orders found.</p>}
            {orders?.length > 0 && (
                <CustomerDataTable orders={orders} descriptionUrl={'takeorder'} />
            )}
        </>
    )
};

export default CustomerList;