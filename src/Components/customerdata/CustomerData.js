import { Button } from 'react-bootstrap';
import './CustomerData.css'
import { Link } from 'react-router-dom';

function CustomerData({ id, order }) {
    console.log({ id, order })

    return (

        <div className="container">
            <div className="row">
                <div className="col-sm-2 col-md-2 col-lg-2 border">
                    <p>{id}</p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 border">
                    <p>{order.orderItems[0].menu.restaurant}</p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 border">
                    <p>{order.user.address}</p>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2 border">
                    <Link to={`/takeOrder/${order.id}`}>
                        <Button variant="primary">
                            View
                        </Button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default CustomerData;