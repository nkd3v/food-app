import { Button, Container, Form } from "react-bootstrap";
import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css";
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";
import { useState } from "react";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const { cartItems, clearCart } = useShoppingCart()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [isNameError, setIsNameError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);

  const price = cartItems.reduce(
    (accumulator, item) => accumulator + (item.menu.price * item.quantity),
    0
  );

  const order = {
    user: user,
    orderItems: cartItems,
    status: 0,
    totalPrice: price,
  };

  const handleCheckout = async () => {
    setLoading(true)

    if (name === '') {
      setIsNameError(true)
    } else {
      setIsNameError(false)
    }
    
    if (phone === '') {
      setIsPhoneError(true)
    } else {
      setIsPhoneError(false)
    }

    if (address === '') {
      setIsAddressError(true)
    } else {
      setIsAddressError(false)
    }

    if (name === '' || phone === '' || address === '') {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      setLoading(false)
      return
    }

    const finalOrder = {
      ...order,
      receiverName: name,
      phoneNumber: phone,
      address,
    }

    await fetch('https://api.dishdrop.pp.ua/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalOrder),
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
    setLoading(false)
  }

  return (
    <div className="shopping_cart_body">
      <div className="shopping_cart_container">
        {cartItems.length > 0 ? (
          <>
            <div>
              <Cart key={v4()} {...order} />
            </div>
            <Form style={{ width: '100%' }}>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อผู้รับ</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className={isNameError ? "is-invalid" : ""} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={isPhoneError ? "is-invalid" : ""} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>จุดส่งอาหาร</Form.Label>
                <Form.Control as="textarea" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className={isAddressError ? "is-invalid" : ""} />
              </Form.Group>
            </Form>

            <Button onClick={handleCheckout}
              style={{ height: "2.5rem" }}
              className="align-self-center w-100 mt-1"
              disabled={loading}
            >Checkout</Button>
          </>
        ) : (
          <Container className="w-100 d-flex justify-content-center">
            <p>Your cart is empty 🛒</p>
          </Container>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
