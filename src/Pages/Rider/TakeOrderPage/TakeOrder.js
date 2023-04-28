import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Order from "../../../Components/Order/Order";

const TakeOrder = () => {
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

    return order?.id ? (
        <>
            <Order key={uuidv4()} {...order} />
            <Button key={uuidv4()}>Take Order</Button>
        </>
    ) : <p>Loading...</p>
};

export default TakeOrder;