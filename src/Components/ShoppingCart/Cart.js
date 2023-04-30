import { v4 } from "uuid";
import "./Cart.css"

function Cart(order){
    return (
        <>
            <p>ร้านอาหาร: {order.orderItems[0].menu.restaurant}</p>
            <p>รายการอาหาร:</p>
            <ul>
                {order.orderItems.map(
                    item => <li key={v4()}>{item.quantity}x {item.menu.foodName}</li>
                )}
            </ul>
            <p>การชำระเงิน: ชำระเงินปลายทาง</p>
        </>
    )
}
export default Cart;