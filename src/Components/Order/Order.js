import React from 'react'
import { v4 } from 'uuid'
import OrderStatus from '../../Utilities/OrderStatus'
import './Order.css'

function Order(order) {
    return (
        <div className='order-box'>
            <p><span className='font-weight-bold'>รหัสคำสั่งซื้อ:</span> {order.id}</p>
            <p>ผู้ใช้บริการ: {order.receiverName}</p>
            <p>ร้านอาหาร: {order.orderItems[0].menu.restaurant}</p>
            <p>รายการอาหาร:</p>
            <ul>
                {order.orderItems.map(
                    item => <li key={v4()}>{item.quantity}x {item.menu.foodName}</li>
                )}
            </ul>
            <p>เบอร์โทรศัพท์: {order.phoneNumber}</p>
            <p>จุดส่งอาหาร: {order.address}</p>
            <p>การชำระเงิน: ชำระเงินปลายทาง</p>
            <p>ราคาสุทธิ: {order.totalPrice}</p>
            <p>สถานะ: {OrderStatus(order.status)}</p>
        </div>
    )
}

export default Order