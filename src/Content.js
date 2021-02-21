import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import cpat from './components/Pics/cardPat1.jpg'


const Styles = styled.div`
    .container{
        background-image: url(${cpat});
        padding: 5%;
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
        margin-top:20%;
        margin-bottom:15%;
        /* text-align:center; */
    }
    h1{
        margin-top:4%;
    }
    }
`

const Content = ({ realData }) => {

    const { id } = useParams();


    return (
        <Styles>
                {Object.keys(realData).filter((i) => i === id).map((id) => {
                    const item = realData[id];
                    return (
                        <Container key={id}>
                            <h1>{item.title}</h1>
                            <br />
                            <h4>{item.category}</h4>
                            <pre>
                                {item.content}
                            </pre>
                            <Link to="/">
                                <Button variant="outline-secondary">Back</Button>
                            </Link>
                        </Container>
                    )
                })}
        </Styles>
    );
}


export default Content;
