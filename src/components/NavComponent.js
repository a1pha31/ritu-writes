import React from "react";
import { HashRouter as Router} from 'react-router-dom';
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
    a.nav-link{
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
            <Router basename="/" />
            <Styles>
                <Navbar variant="light" expand="lg">
                    <Navbar.Brand className="mx-auto">
                        <Link to="/">
                            {navBrand}
                        </Link>
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
                    <Link style={{ display: "inline" }} to="/adminlogin">
                            a1pha
                    </Link>
                    </h6>
                </Nav>
            </Navbar>
        </FooterStyle>
    )
}


const NavLinks = () => {

    return (
        <>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {sessionStorage.getItem("username") && <Link to="/adddata">Add</Link>}
                    {sessionStorage.getItem("username") && <Link to="/showmessage">Messages</Link>}
                    {sessionStorage.getItem("username") && <Link onClick={() => {
                        sessionStorage.clear()
                        window.location.assign("/");
                    }}>
                        Logout
                    </Link>}
                </Nav>
            </Navbar.Collapse>
        </>
    )
}
export default NavComponent;






