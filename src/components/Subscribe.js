import React, { useState, useEffect } from "react";
import { Button, Container, Form} from "react-bootstrap";
import styled from 'styled-components';
import firebase from './../util/firebase';
import ShowModal from './ShowModal';
import { render } from '@testing-library/react';
import bground from './Pics/pat3.jpg'



const Styles = styled.div`

    form{
        width: 50%;
    }
    @media screen and (max-width:990px){
        .container{
            padding: 2%;
            margin-bottom: 20%;
        }
        form{
            width:100%;
        }
    }

    h2{
        text-align:center;
        color:whitesmoke;
    }
    .btn{
        color:whitesmoke;
        border-color:whitesmoke;
    }
    .container{
        padding:2%;
        background-image: url(${bground});
        text-align:center;
        font-family:cursive;
        color:#302F2A;
        margin-top: 2%;
        margin-bottom: 10%;
    }
    @media screen and (max-width: 990px){
        .container{
            text-align:center;
            margin-top: 5%;
            margin-bottom: 20%;
        }
    }
    @media screen and (man-width: 580px){
        .container{
        text-align:center;
        margin-top: 20%;
        margin-bottom: 20%;
        }
    }
`

const Subscribe = () => {

    const DB = firebase.database().ref();
    const [eData, setEData] = useState("");
    const handleChange = (e) =>{
        setEData(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        DB.child('email').push(
            eData,
            err => {
                if (err) {
                    console.log(err);
                    render(<ShowModal message="There was an error.\nPlease try again!!" title="Subscribe" />)
                }
                else {
                    render(<ShowModal message="Thank you!! You have been successfully subscribed." title="Subscribe" />)
                    setEData("");
                }
            }
        )
    }


    return (
        <Styles >
            <Container >
                <h2 >Subscribe</h2>
                <Form className="mx-auto" onSubmit={handleOnSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Control 
                            id="email"
                            value={eData}
                            className="mb-2 mr-sm-2" 
                            autoComplete="off" 
                            onChange={handleChange}
                            name="email" type="email"
                            placeholder="Your Email here" 
                            required 
                        />
                    </Form.Group>
                    <Button className="mb-2 " variant="outline-secondary" type="submit">
                        Subscribe
                    </Button>
                </Form>
            </Container>
        </Styles>
    );
}

export default Subscribe;