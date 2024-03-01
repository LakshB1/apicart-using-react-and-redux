import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

function Header() {
    let dataCount = useSelector(state => state.count);  
    return (
        <div>
            <Navbar expand="lg" className="p-1 header">
                <Container>
                    <Image src={require("../images/1.png")} height="83px" width="90px" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navhome">
                    <Link to="/"><Nav.Link href="#home" className='home text-dark'>Home</Nav.Link></Link>
                </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                            <Link to="/cart"><div className='datapop'  >
                                    <FaShoppingCart className='cart1' />
                                    <h6 className='datalength'> {dataCount}</h6>
                                    </div></Link>
                            </Navbar.Text>
                        </Navbar.Collapse> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;