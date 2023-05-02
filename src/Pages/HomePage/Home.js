import riderImage from "../../Image/rider.png"
import customerImage from "../../Image/customer.png"
import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useEffect } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";

const Home = () => {
    const navigator = useNavigate()
    const { user } = useAuthContext()

    const handleRider = async () => {
        navigator('/login?role=Rider')
    }

    const handleCustomer = async () => {
        navigator('/login?role=Customer')
    }

    useEffect(() => {
        if (user) {
            if (user.role === 'Rider') {
                navigator('/takenOrder')
            } else if (user.role === 'Customer') {
                navigator('/shop')
            }
        }
    }, [user, navigator])

    return (
        <div className="login_container">
            <div className="card_">
                <p>If you want to delivery a food</p>
                <img src={riderImage} alt="Rider" height="200px" />
                <button
                    className="login_button"
                    onClick={handleRider}>
                    Login as Rider
                </button>
                <button
                    className="signup_button"
                    onClick={() => navigator('/signup?role=Rider')}>
                    Signup as Rider
                </button>
            </div>

            <div className="card_">
                <p>Would you like to order some food ?</p>
                <img src={customerImage} alt="Rider" height="200px" />
                <button
                    className="login_button"
                    onClick={handleCustomer}>
                    Login as Customer
                </button>
                <button
                    className="signup_button"
                    onClick={() => navigator('/signup?role=Customer')}>
                    Signup as Customer
                </button>
            </div>
        </div>

    )
};

export default Home;