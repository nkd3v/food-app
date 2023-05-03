import './ShopCard.css'
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
                <img src={`https://storage.googleapis.com/dishdrop/brands/${props.restaurant}.png`} alt='ShopName' height="150px" width="200px" className="brand-logo" /> 
                <h4>{props.restaurant}</h4>
                <p>@{props.canteen}</p>
            </div>
        </Link>
    )
}

export default ShopCard;