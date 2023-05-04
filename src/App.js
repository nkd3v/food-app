import Home from "./Pages/HomePage/Home"

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

import { ShoppingCartPorvider } from './Context/ShoppingCartContext'
import Signup from './Pages/Shared/Signup'
import OrderList from './Pages/Customer/OrderList/OrderList'
import TakenOrder from './Pages/Rider/TakenOrderPage/TakenOrder'
import UpdateOrderStatus from './Pages/Rider/UpdateOrderStatusPage/UpdateOrderStatus'
import Login from './Pages/Shared/Login'

import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { NavbarComponent } from "./Components/Navbar/Navbar"


function App() {
  return (
    <ShoppingCartPorvider>
      <NavbarComponent />
      <Container>
        <div>
          <Routes>
            <Route index element={<Home />} />

            <Route path="customerList" element={<CustomerList />} />
            <Route path="takeOrder/:id" element={<TakeOrder />} />
            <Route path="finishRider" element={<FinishRider />} />
            <Route path="takenOrder" element={<TakenOrder />} />
            <Route path="updateOrderStatus/:id" element={<UpdateOrderStatus />} />

            <Route path="shop" element={<Shop />} />
            <Route path="menu/:id" element={<Menu />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="tracking/:id" element={<Tracking />} />
            <Route path="userRating" element={<UserRating />} />
            <Route path="orderList" element={<OrderList />} />

            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<h1>Not Found</h1>} />

          </Routes>
        </div>
      </Container>
    </ShoppingCartPorvider>
  );
}

export default App;
