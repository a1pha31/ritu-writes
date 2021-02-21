import React from "react";
import { Jumbotron, Button, Container} from "react-bootstrap";
import styled from 'styled-components';
import hindiImg from '../assets/images/hindi.jpg';
import kumImg from '../assets/images/kum.jpg';

const Styles = styled.div`
    .jumbotron{
        background: url(${kumImg}) no-repeat fixed bottom;
        background-size:cover;
        height : 200px;
        position: relative;
        z-index: -2;
        opacity : 0.8;
    }
    .overlay{
        color: white;
        text-align: right;
    }
`

const JumbComp = () => {
    return (
        <Styles>
        <Jumbotron classname="jumb">
            <Container className="overlay">
            <h2>lorem ipsum</h2>
            <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p>
            </Container>
        </Jumbotron>
        </Styles>
    )
}

export default JumbComp;