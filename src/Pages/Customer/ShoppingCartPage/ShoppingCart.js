import { Button, Form } from "react-bootstrap";
import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css";
import { v4 } from "uuid";
import AddressBox from "./AddressBox";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext()

  const { cartItems, clearCart } = useShoppingCart()

  const order = {
    user: user,
    orderItems: cartItems,
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

    clearCart()
  }

  return (
    <div className="shopping_cart_body">
      <div className="shopping_cart_container">
        {cartItems.length > 0 ? (
          <>
            <div>
              <Cart key={v4()} {...order} />
            </div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อผู้รับ</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>จุดส่งอาหาร</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
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
