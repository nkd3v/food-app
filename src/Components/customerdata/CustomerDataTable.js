import { Table } from "react-bootstrap"
import CustomerData from "./CustomerData"

const CustomerDataTable = ({ orders, descriptionUrl }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>วันที่/เวลา</th>
                    <th>ร้านอาหาร</th>
                    <th>ปลายทาง</th>
                    <th>สถานะ</th>
                    <th>รายละเอียด</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => <CustomerData key={index} order={order} descriptionUrl={descriptionUrl} />)}
            </tbody>
        </Table>
    )
}

export default CustomerDataTable