import React from "react";
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import styled from 'styled-components';


const Styles = styled.div`

    .navbar {
        text-align:center;
        position:fixed;
        top:0;
        width:100%;
        letter-spacing: 5px;
        z-index:1;
        background-color:#FBFBFB; 

    }
    
    .nav{
        font-size: 1rem;
    }
    .navbar-brand{
        font-size : 2rem;
        color: #000;
        font-family: 'Cedarville Cursive', cursive;        
        &:hover {
            color: black;
        }
    }
    a{
        color: black !important;
    }
    @media screen and (max-width:990px){
        .navbar-brand{
            font-size : 1.5rem;
        }
    
    }
    
`

const FooterStyle = styled.div`
    .navbar{
        position:fixed;
        width: 100%;
        bottom :0;
        background-color:#D8D8D8; 
        z-index:1;
        margin-top:10%;
        height: 7%;
    }
        
`
const NavComponent = () => {
    const navBrand = 'Ritu Raj Raushan';
    return (
        <div>
            <Router/>
            <Styles>
                <Navbar variant="light" expand="lg">
                    <Navbar.Brand className="mx-auto">
                        <Nav.Link as={Link} to="/">{navBrand}</Nav.Link>
                    </Navbar.Brand>
                    {sessionStorage.getItem("username") && <NavLinks />}
                </Navbar>
            </Styles>
            <Footer />
        </div>
    )
}

const Footer = () => {
    return (
        <FooterStyle>
            <Navbar>
                <Nav className="ml-auto">
                    <h6 style={{ display: "inline" }}>Made with ❤ by
                    <Nav.Link as={Link} style={{ display: "inline" }} to="/adminlogin">
                            a1pha
                    </Nav.Link>
                    </h6>
                </Nav>
            </Navbar>
        </FooterStyle>
    )
}


const NavLinks = () => {
    const history = useHistory();
    return (
        <>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {sessionStorage.getItem("username") && <Nav.Link as={Link} to="/adddata">Add</Nav.Link>}
                    {sessionStorage.getItem("username") && <Nav.Link as={Link} to="/showmessage">Messages</Nav.Link>}
                    {sessionStorage.getItem("username") && <Nav.Link as={Link} onClick={() => {
                        sessionStorage.clear()
                        history.push("/");
                        window.location.reload();
                        // window.location.assign("/");
                    }}>
                        Logout
                    </Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </>
    )
}
export default NavComponent;






