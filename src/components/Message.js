import React, {useState} from "react";
import { Container, Form, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import bground from './Pics/moroccan-flower.png'
import firebase from '../util/firebase';
import ShowModal from './ShowModal';
import { render } from '@testing-library/react';

const Styles = styled.div`
    form{
        width: 50%;
    }
    @media screen and (max-width:990px){
        h2{
            text-align:center;
        }
        .container{
            padding: 2%;
            margin-bottom:5%;
        }
        form{
            width:100%;
        }
    }
    .container{
        font-family:cursive;
        color:#302F2A;
        background-image: url(${bground});
        margin-bottom:5%;
        background-color:#DFECE5;
        padding:3%;
    }
    h2{
        
    }
`

const Message = () => {

    const DB = firebase.database().ref();

    const [fData, setFData] = useState({
        name:"",
        email:"",
        message:""
    });

    const handleChange = (e) => {
        setFData({
            ...fData,
            [e.target.name] : e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(fData);
        DB.child('message').push(
            fData,
            err => {
                if (err) {
                    console.log(err);
                    render(<ShowModal message="There was an error.\nPlease try again!!" title="Send a Message" />)
                }
                else {
                    render(<ShowModal message="Your message is successfully sent." title="Send a Message" />)
                    setFData({
                        name: "",
                        email: "",
                        message: ""
                    })
                }
            }
        )
    }

    return (
        <Styles>
            <Container>
                <h2>Send a message</h2>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control autoComplete="off" onChange={handleChange} name ="name" value={fData.name} type="text" placeholder="Your Name" required/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete="off" onChange={handleChange} name="email" value={fData.email} type="email" placeholder="name@example.com" required/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Message</Form.Label>
                        <Form.Control placeholder="Your message here.... " onChange={handleChange} name="message" value={fData.message} as="textarea" rows={3} required/>
                    </Form.Group>
                    <Button variant="outline-secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </Styles>
    );
}

export default Message;