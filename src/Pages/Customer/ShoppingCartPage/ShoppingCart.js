import { Button } from "react-bootstrap";
import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css"

const ShoppingCart = () => {
  let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

  const handleCheckout = async () => {
    const mockUser = {
      "id": "ffffffffffffffffffffffff",
      "username": "string",
      "email": "string",
      "phoneNumber": "string",
      "role": "string",
      "address": "string",
      "coordinate": "string",
      "firstName": "string",
      "lastName": "string"
    };

    const order = {
      user: mockUser,
      orderItems: cartItems,
      detail: "string",
      status: 0
    }

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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div className="shopName_container">
        Shop
      </div>
      <div>
        {cartItems?.map?.(item => <Cart key={item.menu.id} {...item} />)}
      </div>
      <Button onClick={handleCheckout}>
        Checkout
      </Button>
    </>
  )
};

export default ShoppingCart;