import "./Home.css"
import riderImage from "../../Image/rider.png"
import customerImage from "../../Image/customer.png"

const Home = () => {
    return(
        <div className="login_container">
            <div className="card_">
                <p>If you want to delivery a food</p>
                <img src={riderImage} alt="Rider" height="200px"/>
                <button 
                className="login_button"
                onClick={event =>  window.location.href='/CustomerList'}>Login as Rider</button>
            </div>

            <div className="card_">
                <p>Would you like to order some food ?</p>
                <img src={customerImage} alt="Rider" height="200px"/>
                <button 
                className="login_button"
                onClick={event =>  window.location.href='/Shop'}>Login as Customer</button>
            </div>
        </div>
        
    ) 
  };
  
  export default Home;