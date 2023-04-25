import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Navbar } from "./Components/Navbar/Navbar"

import Home from "./Pages/HomePage/Home"
import AboutUs from "./Pages/HomePage/AboutUs"

//Rider
import CustomerList from "./Pages/Rider/CustomerListPage/CustomerList"
import TakeOrder from "./Pages/Rider/TakeOrderPage/TakeOrder"
import FinishRider from "./Pages/Rider/FinishRiderPage/FinishRider"

//Customer
import Shop from "./Pages/Customer/ShopPage/Shop"
import Menu from "./Pages/Customer/MenuPage/Menu"
import ShoppingCart from "./Pages/Customer/ShoppingCartPage/ShoppingCart"
import Payment from "./Pages/Customer/PaymentPage/Payment"
import Tracking from "./Pages/Customer/TrackingPage/Tracking"
import UserRating from "./Pages/Customer/UserRatingPage/UserRating"

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <div>
          <Routes>
            <Route index element={<Home />} />

            <Route path="customerList" element={<CustomerList />} />
            <Route path="takeOrder" element={<TakeOrder />} />
            <Route path="finishRider" element={<FinishRider />} />

            <Route path="shop" element={<Shop />} />
            <Route path="menu" element={<Menu />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="userRating" element={<UserRating />} />

          </Routes>
        </div>
      </Container>
    </>
  );
}

export default App;
