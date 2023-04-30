import { Button } from 'react-bootstrap';
import './CustomerData.css'
import { Link } from 'react-router-dom';
import OrderStatus from '../../Utilities/OrderStatus';
import ThaiDateTime from '../../Utilities/ThaiDateTime';

function CustomerData({ order, descriptionUrl }) {
    return (
        <>
            <tr>
                {console.log(order)}
                <td>{ThaiDateTime(order.createdAt)}</td>
                <td>{order.orderItems[0].menu.restaurant}</td>
                <td>{order.user.address}</td>
                <td>{OrderStatus(order?.status)}</td>
                <td className='text-center'>
                    <Link to={`/${descriptionUrl}/${order?.id}`}>
                        <Button variant="primary">
                            ดู
                        </Button>
                    </Link></td>
            </tr>
        </>
    )
}

export default CustomerData;