import { useEffect, useState } from 'react';
import './OrderList.css'
import CustomerDataTable from '../../../Components/customerdata/CustomerDataTable';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const OrderList = () => {
    const [orders, setOrders] = useState(null);
    const { user } = useAuthContext()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.dishdrop.pp.ua/api/order/customer/${user.id}`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [user.id]);

    return (
        <>
            <h1>Orders List</h1>
            {orders === null && <p>Loading...</p>}
            {orders?.length === 0 && <p>No orders found.</p>}
            {orders?.length > 0 && (
                <CustomerDataTable orders={orders} descriptionUrl={'tracking'} />
            )}
        </>
    )
};

export default OrderList;