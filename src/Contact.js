import React from "react";
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Styles = styled.div`
    .container{
        margin-top:10%;
        margin-bottom:10%;
        /* text-align:center; */
    }
    h1{
        margin: 1%;
        margin-left:0;
    }
    
    

    @media screen and (max-width:990px){
        .container{
        margin-top:15%;
        margin-bottom:10%;
        /* text-align:center; */
    }
    h1{
        margin-top:4%;
    }
`

const Contact = () => {
    return (
        <Styles>
            <Container>
                <h1>Contact</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius, tortor sit amet elementum feugiat, ligula ante rutrum ante, eget placerat neque nunc ac nisi. Phasellus pharetra, justo non condimentum faucibus, quam lacus tincidunt massa, congue rhoncus neque magna vitae augue. Pellentesque laoreet, enim et consequat tincidunt, nunc est imperdiet diam, eu ullamcorper leo felis quis est. Etiam eget justo tellus. Duis semper est sit amet augue varius sollicitudin. Quisque finibus est in tincidunt viverra. Aliquam eget congue sapien, eu sodales est.</p>
                <Link to="/">
                    <Button variant="outline-secondary">Back</Button>
                </Link>
            </Container>
        </Styles>
    )
}

export default Contact;