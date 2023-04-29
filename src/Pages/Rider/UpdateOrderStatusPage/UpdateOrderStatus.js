import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
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

    const [status, setStatus] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.dishdrop.pp.ua/api/order/status/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return order?.id ? (
        <>
            <Order key={uuidv4()} {...order} />
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select new status:</Form.Label>
                        <DropdownButton
                            variant="secondary"
                            title={status ? status.charAt(0).toUpperCase() + status.slice(1) : '-- Select --'}
                            onSelect={(eventKey) => setStatus(eventKey)}
                        >
                            <Dropdown.Item eventKey={20}>Out for delivery</Dropdown.Item>
                            <Dropdown.Item eventKey={30}>Delivered</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                    <Button type="submit" disabled={!status}>Update</Button>
                </Form>
            </div>
        </>
    ) : <p>Loading...</p>
};

export default UpdateOrderStatus;