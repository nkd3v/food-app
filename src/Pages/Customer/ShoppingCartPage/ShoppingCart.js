import Cart from "../../../Components/ShoppingCart/Cart";
import "./ShoppingCart.css"

const ShoppingCart = () => {
    return(
        <>
        <div className="shopName_container">
            Shop
        </div>
        <div>
            <Cart/>
            <Cart/>
            <Cart/>
        </div>
        </>
    ) 
  };
  
  export default ShoppingCart;