import React from 'react'
import { v4 } from 'uuid'

function Order(order) {
    return (
        <>
            <p>รหัสคำสั่งซื้อ: {order.id}</p>
            <p>ผู้ใช้บริการ: {order.user.firstName} {order.user.lastName}</p>
            <p>ร้านอาหาร: {order.orderItems[0].menu.restaurant}</p>
            <p>รายการอาหาร:</p>
            <ul>
                {order.orderItems.map(
                    item => <li key={v4()}>{item.quantity}x {item.menu.foodName}</li>
                )}
            </ul>
            <p>จุดส่งอาหาร: {order.user.address}</p>
            <p>การชำระเงิน: {order.id}</p>
            <p>สถานะ: {order.status}</p>
        </>
    )
}

export default Order