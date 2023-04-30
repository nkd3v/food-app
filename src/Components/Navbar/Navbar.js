import { Navbar as NavbarBs, Nav, Container, Button, Image } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useLogout } from "../../Hooks/useLogout"
import { useAuthContext } from "../../Hooks/useAuthContext"
import './Navbar.css'
import logo from '../../Image/logo.png'

export function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Image src={logo} alt="logo" className="logo"/>
                <Nav className="me-auto">
                    {user === null && (
                        <Nav.Link to={'/'} as={NavLink}>
                            Home
                        </Nav.Link>
                    )}

                    {user?.role === 'Rider' && (
                        <>
                            <Nav.Link to="/customerlist" as={NavLink}>
                                Orders List
                            </Nav.Link>
                            <Nav.Link to="/takenorder" as={NavLink}>
                                My Orders
                            </Nav.Link>
                        </>
                    )}

                    {user?.role === 'Customer' && (
                        <>
                            <Nav.Link to="/shop" as={NavLink}>
                                Shop
                            </Nav.Link>
                            <Nav.Link to="/orderList" as={NavLink}>
                                My Orders
                            </Nav.Link>
                        </>
                    )}

                    <Nav.Link to="/about" as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">

                    {user?.role === 'Customer' && (
                        <Nav.Link to='/shoppingCart' as={NavLink}>
                            Shopping Cart
                            {/* <Button
                                // onClick={event => window.location.href = '/shoppingCart'}
                                style={{ width: "3rem", height: "3rem" }}
                                variant="outline-primary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="cart"><path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96a2 2 0 0 0-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
                            </Button> */}
                        </Nav.Link>
                    )}
                </Nav>

                {user !== null && (
                    <>
                        <div className="d-flex">
                            <Button onClick={handleLogout} style={{margin: "0px 0px 0px 10px"}}>Sign out</Button>
                        </div>
                    </>
                )}
            </Container>
        </NavbarBs>
    )
}