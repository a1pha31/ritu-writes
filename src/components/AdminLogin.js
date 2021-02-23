import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import {Button, Container} from "react-bootstrap";
import styled from 'styled-components';
import firebase from './../util/firebase';
import ShowModal from './ShowModal';
import { render } from '@testing-library/react';
import bground from './Pics/cardPat1.jpg'
import {useHistory} from 'react-router-dom';

const Styles = styled.div`
    .container{
        background-image: url(${bground});
        margin-top: 5%;
        margin-bottom: 10%;
        /* text-align:center; */
    }
@media screen and (max-width: 990px){
        .container{
        margin-top: 15%;
        margin-bottom: 15%;
        /* text-align:center; */
    }
}
@media screen and (max-width: 580px){
        .container{
        margin-top: 20%;
        margin-bottom: 20%;
        /* text-align:center; */
    }
}

    @media all and (min-width: 480px) {
        .container {
            padding: 60px 0;
        }

        .container form {
            margin: 0 auto;
            max-width: 320px;
        }
    }    
    h1{
        text-align:center;
        margin: 3%;
    }
`

export default function AdminLogin() {

    const history = useHistory();
    if(sessionStorage.getItem('username')){
        history.push('/');
        // window.location.assign('/');
    }

    const DB = firebase.database().ref();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [allLoginData, setAllLoginData] = useState({});

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const id = Object.keys(allLoginData).find((id) => allLoginData[id].username === username);
        if(id){
            console.log(allLoginData[id].password, password)
            if (allLoginData[id].password === password){
                sessionStorage.setItem("username", username);
                history.push("/");
                // window.location.assign("/"); 
            }
            else{
                render(<ShowModal message="Wrong Password" title="Login"/>)
                // alert("wrong password")
            }
        }
        else{
            render(<ShowModal message="Wrong Username" title="Login" />)
            // alert("wrong username")
        }
    }

    useEffect(() => {

        DB.child('adminlogin').on('value', snapshot => {
            if(snapshot.val() != null){
                setAllLoginData({
                    ...snapshot.val()
                })
            }
        })
    }, [])

    return (
        <Styles>
            <Container>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <h1><b>LOGIN</b></h1>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                    <Button block size="lg" type="submit" variant="outline-secondary" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
            </Container>
        </Styles>
    );
}