import { v4 } from "uuid";
import "./Cart.css"

function Cart(order) {
    return (
        <div className="cartbox">
            <p>โรงอาหาร: {order.orderItems[0].menu.restaurantAddress}</p>
            <p>ร้านอาหาร: {order.orderItems[0].menu.restaurant}</p>
            <p>รายการอาหาร:</p>
            <ul>
                {order.orderItems.map(
                    item => <li key={v4()}>{item.quantity}x {item.menu.foodName} {item.menu.price * item.quantity} บาท</li>
                )}
            </ul>
            <p>การชำระเงิน: ชำระเงินปลายทาง</p>
            <p>ราคาสุทธิ: {order.orderItems.reduce(
                (accumulator, item) => accumulator + (item.menu.price * item.quantity),
                0
            )}</p>
        </div>
    )
}
export default Cart;