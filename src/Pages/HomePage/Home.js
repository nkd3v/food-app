import "./Home.css"
import riderImage from "../../Image/rider.png"
import customerImage from "../../Image/customer.png"
import { useLogin } from "../../Hooks/useLogin";

const Home = () => {
    const { login } = useLogin()

    const handleRider = async () => {
        await login('rider', 'rider')
        window.location.href = '/CustomerList'
    }

    const handleCustomer = async () => {
        await login('customer', 'customer')
        window.location.href = '/Shop'
    }

    return (
        <div className="login_container">
            <div className="card_">
                <p>If you want to delivery a food</p>
                <img src={riderImage} alt="Rider" height="200px" />
                <button
                    className="login_button"
                    onClick={handleRider}>Login as Rider</button>
            </div>

            <div className="card_">
                <p>Would you like to order some food ?</p>
                <img src={customerImage} alt="Rider" height="200px" />
                <button
                    className="login_button"
                    onClick={handleCustomer}>Login as Customer</button>
            </div>
        </div>

    )
};

export default Home;