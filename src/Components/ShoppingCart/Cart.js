import "./Cart.css"

function Cart(props){
    return(
        <div className="cart_container">
            {JSON.stringify(props)}
        </div>
    )
}
export default Cart;