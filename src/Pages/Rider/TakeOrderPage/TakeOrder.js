import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const TakeOrder = () => {
    const [orderData, setOrderData] = useState(null);
    const [order, setOrder] = useState(null);
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
        if (orderData) {
            setOrder(orderData.find(item => item.id === id))
        }
    }, [orderData, id])

    return order ? (
        <>
            <p>รหัสคำสั่งซื้อ: {order.id}</p>
            <p>ผู้ใช้บริการ: {order.user.firstName} {order.user.lastName}</p>
            <p>ร้านอาหาร: {order.orderItems[0].menu.restaurant}</p>
            <p>รายการอาหาร:</p>
            <ul>
                {order.orderItems.map(
                    item => <li>{item.quantity}x {item.menu.foodName}</li>
                )}
            </ul>
            <p>จุดส่งอาหาร: {order.user.address}</p>
            <p>การชำระเงิน: {order.id}</p>
            <p>สถานะ: {order.status}</p>
            <Button>Take Order</Button>
        </>
    ) : <p>Loading...</p>
};

export default TakeOrder;