import Cart from "../../../Components/ShoppingCart/Cart";

const ShoppingCart = () => {
    return(
        <>
        <div className="p-4 m-4 d-flex justify-content-center rounded shadow">
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