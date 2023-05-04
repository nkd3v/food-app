import { Button, Container, Form } from "react-bootstrap";
import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css";
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthContext()
  const { cartItems, clearCart } = useShoppingCart()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [isNameError, setIsNameError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);

  useEffect(() => {
    console.log({user, token})
    // fetch user info from api
    // set name, phone, address
    const fetchUserInfo = async () => {
      const response = await fetch(`https://api.dishdrop.pp.ua/api/user/${user.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();

      setName(data.firstName);
      setPhone(data.phoneNumber);
      setAddress(data.address);
    }

    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    const checkPhoneNumber = (number) => {
      const regex = /^[0-9]{10}$/;
      return regex.test(number)
    }

    if (name === '') {
      setIsNameError(true)
    } else {
      setIsNameError(false)
    }

    if (phone === '' || !checkPhoneNumber(phone)) {
      setIsPhoneError(true)
    } else {
      setIsPhoneError(false)
    }

    if (address === '') {
      setIsAddressError(true)
    } else {
      setIsAddressError(false)
    }

    if (name === '' || phone === '' || address === '' || !checkPhoneNumber(phone)) {
      setLoading(false)
      return
    }

    const finalOrder = {
      ...order,
      receiverName: name,
      phoneNumber: phone,
      address,
    }

    clearCart()

    await fetch('https://api.dishdrop.pp.ua/api/User/updatedeliveryinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split(';').find(cookie => cookie.includes('access_token'))?.split("=")[1]}`,
      },
      body: JSON.stringify({ firstName: name, address, phoneNumber: phone }),
      credentials: 'include',
    })

    await fetch('https://api.dishdrop.pp.ua/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalOrder),
      credentials: 'include',
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
            <Form className="w-100">
              <Form.Group className="mb-3">
                <Form.Label>ชื่อผู้รับ</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className={isNameError ? "is-invalid" : ""} />
                {isNameError && <Form.Text className="text-danger">กรุณากรอกชื่อให้ถูกต้อง</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={isPhoneError ? "is-invalid" : ""} />
                {isPhoneError && <Form.Text className="text-danger">กรุณากรอกเบอร์ติดต่อให้ถูกต้อง</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>จุดส่งอาหาร</Form.Label>
                <Form.Control as="textarea" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className={isAddressError ? "is-invalid" : ""} />
                {isAddressError && <Form.Text className="text-danger">กรุณากรอกจุดรับอาหารให้ถูกต้อง</Form.Text>}
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
