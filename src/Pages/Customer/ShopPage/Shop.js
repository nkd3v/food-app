import ShopCard from '../../../Components/ShopCard/ShopCard'
import './Shop.css'

const Shop = () => {
    return(
        <div>
            <h1>choose a restaurant</h1>
            <div className='ShopCard_container'>
                <ShopCard />
                <ShopCard />
                <ShopCard />
                <ShopCard />
                <ShopCard />    
                <ShopCard />
            </div>
        </div>
    ) 
  };
  
  export default Shop;