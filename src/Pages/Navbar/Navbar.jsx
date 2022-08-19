import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useParams, useLocation } from "react-router-dom"
function NavBar() {
    const location = useLocation();
    const users = useParams().page || 'users';
    const products = useParams().page || 'products';
    let active = ""
    if (location.pathname === "/users") {
        active = "active-users"
    }
    if (location.pathname === "/products") {
        active = "active-products"
    }
    return (
        <Navbar expand="lg" variant="light" bg="transparent">
            <Container className="py-4">
                <Navbar.Brand href="#"><p className="fw-bold">Edvora</p></Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="ms-5">
                        <Link to={`/${products}`} className={`fw-bold text-decoration-none text-muted ${active === "active-users" ? "" : active}`}>Products</Link>
                    </Navbar.Text>
                    <Navbar.Text className="ms-5">
                        <Link to={`/${users}`} className={`fw-bold text-decoration-none text-muted ${active === "active-products" ? "" : active}`}>Users</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;