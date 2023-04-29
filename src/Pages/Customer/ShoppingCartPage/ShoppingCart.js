import { Button } from "react-bootstrap";
import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css";
import { v4 } from "uuid";
import AddressBox from "./AddressBox";
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();

  let cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

    const mockUser = {
        "id": "ffffffffffffffffffffffff",
        "username": "john",
        "email": "john@dishdrop.pp.ua",
        "phoneNumber": "0123456789",
        "role": "customer",
        "address": "ตึก ECC ห้อง 1234",
        "coordinate": "string",
        "firstName": "John",
        "lastName": "Doi"
    };

  const order = {
    user: mockUser,
    orderItems: cartItems,
    detail: "string",
    status: 0,
  };

    const handleCheckout = async () => {

        await fetch('https://api.dishdrop.pp.ua/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                navigate(`/tracking/${data.id}`)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

  return (
    <div className="shopping_cart_body">
      <div className="shopping_cart_container">
        {cartItems.length > 0 ? (
          <>
            <div>
              <Cart key={v4()} {...order} />
            </div>
            <AddressBox />
            {/* เอา payment ออก เพราะรีบ */}
            <Button onClick={handleCheckout}
            style={{ width: "10rem", height: "2.5rem" }}
            >Checkout</Button>
          </>
        ) : (
          <>
            <p>Your cart is empty 🛒</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
