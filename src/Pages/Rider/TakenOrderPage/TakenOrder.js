import { useEffect, useState } from 'react';
import './TakenOrder.css'
import CustomerDataTable from '../../../Components/customerdata/CustomerDataTable';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const TakenOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const { user } = useAuthContext()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.dishdrop.pp.ua/api/order/rider/${user.uid}`);
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
        <h1>My Orders</h1>
        {orderData.length > 0 ? (
            <CustomerDataTable orders={orderData} descriptionUrl={'updateorderstatus'} />
        ) : <p>   </p>}
        </>
    )
};

export default TakenOrder;