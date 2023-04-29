import { Button } from "react-bootstrap";
import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css";
import { v4 } from "uuid";

const ShoppingCart = () => {
  let cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  const mockUser = {
    id: "ffffffffffffffffffffffff",
    username: "string",
    email: "string",
    phoneNumber: "string",
    role: "string",
    address: "string",
    coordinate: "string",
    firstName: "string",
    lastName: "string",
  };

  const order = {
    user: mockUser,
    orderItems: cartItems,
    detail: "string",
    status: 0,
  };

  const handleCheckout = async () => {
    await fetch("https://api.dishdrop.pp.ua/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="shopping_cart_body">
      <div className="shopping_cart_container">
        {cartItems.length > 0 ? (
          <>
            <div>
              <Cart key={v4()} {...order} />
            </div>
            <Button onClick={event =>  window.location.href='/Payment'}
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
