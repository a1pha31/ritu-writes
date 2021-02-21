import React, {useState} from 'react';
import firebase from './util/firebase';
import { Form, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ShowModal from './components/ShowModal';
import { render } from '@testing-library/react';
import {Link } from 'react-router-dom';
import cpat from './components/Pics/cardPat1.jpg'

const Styles = styled.div`
    .container{
        background-image: url(${cpat});
        padding: 5%;
        margin-top: 10%;
        margin-bottom: 10%;
    }
@media screen and (max-width: 990px){
        .container{
        margin-top: 23%;
        margin-bottom: 15%;
    }
}
@media screen and (man-width: 580px){
        .container{
        margin-top: 20%;
        margin-bottom: 20%;
    }
}
`
const AddData = ({ realData }) => {

    if(!sessionStorage.getItem("username")){
        window.location.assign("/");
    }

    const allCategories = ["All", ...new Set(Object.keys(realData).map((id) => realData[id].category))];

    const DB = firebase.database().ref();
    const [data, setData] = useState({
        title:"",
        category:"",
        content:""
    });

    const handleOnChange = (e)=> {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
        if(data.category && data.title && data.content){
            DB.child('content').push(
                data,
                err => {
                    if (err) {
                        console.log(err);
                        render(<ShowModal message="There was an error.\nPlease try again!!" title="Post" />)
                    }
                    else {
                        render(<ShowModal message="Your post is successfully uploaded." title="Post" />)
                        setData({
                            title: "",
                            category: "",
                            content: ""
                        })
                    }
                })
        }
        else{
            render(<ShowModal message="Please fill all sections carefully." title="Empty Input"/>)
        }
    }    


    return (
        <Styles>
            <Container>
                <Form className="col-lg-6 col-md-10" onSubmit={handleOnSubmit} autoComplete="off">
                <h1>Add </h1><br />
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={handleOnChange} type="text" value={data.title} name="title" placeholder="Title"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control onChange={handleOnChange} type="text" value={data.category} name="category" placeholder="Category"/>
                        <Form.Text id="exampleForm.ControlInput2" muted>
                            <span>E.g</span>{allCategories.filter((i)=> i !== 'All').map((cat) => {
                                return (<span key={cat}>,&emsp;{cat}</span>
                                )
                            })}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" value={data.content} onChange={handleOnChange} as="textarea" rows={15} placeholder="Type or Paste Content here"/>
                    </Form.Group>
                    <Button variant="outline-secondary" type="submit">
                        Submit
                    </Button>
                    <Link to="/">
                        <Button style={{ marginLeft: "2%" }} variant="secondary">Back</Button>
                    </Link>
                </Form>
                
            </Container>
        </Styles>
    );
    
}

export default AddData;