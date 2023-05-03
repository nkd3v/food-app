import './ShopCard.css'
import logo from "../../Image/McDonalds-logo.png"
import { Link } from 'react-router-dom'

function ShopCard(props) {
    return (
        <Link
            to={`/menu/${props.id}`}
            style={{
                textDecoration: 'none', // remove the underline
                color: 'black' // change the color to black
            }}
        >
            <div className='shopCard_container_component'>
                {/* change image */}
                <img src={logo} alt='ShopName' width="200px" /> 
                <h4>{props.restaurant}</h4>
                <p>@{props.canteen}</p>
            </div>
        </Link>
    )
}

export default ShopCard;