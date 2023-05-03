import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Order from "../../../Components/Order/Order";

const UpdateOrderStatus = () => {
    const [orderData, setOrderData] = useState([]);
    const [order, setOrder] = useState({});
    const { id } = useParams()

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

    useEffect(() => {
        if (orderData.length > 0) {
            setOrder(orderData.find(item => item.id === id))
        }
    }, [orderData, id])

    const handleUpdateStatus = (event) => {
        event.preventDefault();
        fetch(`https://api.dishdrop.pp.ua/api/order/status/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event.target.value),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));

        setOrder({ ...order, status: Number(event.target.value) })
    };

    return order?.id ? (
        <>
            <Order key={uuidv4()} {...order} />
            <Button value={50} onClick={handleUpdateStatus} className="me-2 mb-3" disabled={order.status >= 50}>Out for delivery</Button>
            <Button value={100} onClick={handleUpdateStatus} className="mb-3" disabled={order.status === 100}>Finish delivery</Button>
        </>
    ) : <p>Loading...</p>
};

export default UpdateOrderStatus;