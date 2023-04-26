import './ShopCard.css'
import logo from "../../Image/McDonalds-logo.png"

function ShopCard() {

    return (
        <div className='shopCard_container_component'>
            <img src={logo} alt='ShopName'width="200px"/>
            <h4>Shop Name</h4>
            <p>@KMITL</p>       
        </div>
    )
}

export default ShopCard;