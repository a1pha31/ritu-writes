import React, { useState } from "react";
import styled from 'styled-components';
import { Button, CardDeck, Card, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import firebase from './util/firebase';
import ShowModal from './components/ShowModal';
import { render } from '@testing-library/react';
import bground from './components/Pics/stone.jpg'
import cpat from './components/Pics/cardPat1.jpg'



const Styles = styled.div`

    
    .btn{
        background-image: url(${cpat});
        background-color: black;
        border-color:black;
        color:black;
    }
    
    .container{
        background-image: url(${bground});
        padding: 5%;
        margin-top:5%;
        margin-bottom:5%;
        /* text-align:center; */
    }
    
    pre {
    white-space: pre-wrap;
    word-break: break-word;
}
    h1{
        color:#F0F0EE;
        margin: 1%;
        margin-left:0;
        font-family:cursive;
        font-size:3rem;
    }
    button{
        margin:2%;
        margin-left:auto;
    }
    .card{
        background-image: url(${cpat});
        margin:2%;
        min-width: 12rem;
    }
    @media screen and (max-width:990px){
        .container{
            padding: 5%;
            margin-top:10%;
            margin-bottom:10%;
        /* text-align:center; */
    }
    h1{
        margin-top:4%;
    }
    }
    @media screen and (man-width:580px ){
        .container{
            padding: 5%;
            margin-top:10%;
            margin-bottom:20%;
        /* text-align:center; */
    }
    h1{
        margin-top:6%;
    }
}
`


const AllContent = ({ realData }) => {

    const DB = firebase.database().ref();
    const [type, setType] = useState(sessionStorage.getItem('cType'));
    const allCategories = ["All", ...new Set(Object.keys(realData).map((id) => realData[id].category))];
    const totalLength = Object.keys(realData).length;
    const [count, setCount] = useState(6);
    const [isMore, setIsMore] = useState(false);
    
    const deletePost = (props) => {
        if (window.confirm(`Are you sure to delete this post?`)) {
            DB.child(`content/${props.id}`).remove(
                err => {
                    if (err) {
                        console.log(err);
                        render(<ShowModal message="There was an error.\nPlease try again!!" title="Delete Post" />)
                    }
                    else {
                        render(<ShowModal message="Your post is successfully deleted." title="Delete Post" />)
                    }
                })
            setType("All");
        }
    }

    return (

        <Styles>
            <Container>
                <h1>{type}</h1>
                {allCategories.map((cat) => {
                    return (<Button key={cat} variant="outline-secondary" onClick={() => {
                        setType(cat)
                        sessionStorage.setItem('cType', cat);
                    }}>{cat}</Button>
                    )
                })}
                <Content contentData={realData} cat={type} deletePost={deletePost} count={count} />
                {!isMore && <Button onClick={() => { setCount(totalLength); setIsMore(true) }} variant="outline-secondary btn-sm">Show All</Button>}
                {isMore && <Button onClick={() => { setCount(6); setIsMore(false) }} variant="outline-secondary btn-sm">Show Less</Button>}
            </Container>
        </Styles>

    )
}


const Content = ({ contentData, cat, deletePost, count }) => {

    const history = useHistory();
    if (cat === 'All') {
        return (
            <CardDeck >
                {Object.keys(contentData).slice(0,count).map((id) => {
                    const item = contentData[id];
                    const abc = item.content.substring(0, 100);
                    return (
                        <Card key={id}>
                            <Card.Body >
                                <Card.Title>{item.title}</Card.Title>
                                <p>{item.category}</p>
                                <Card.Text >
                                    <pre>
                                        {abc}
                                    </pre>
                                </Card.Text>
                                <Link to={`/content/${id}`}>
                                    <Button variant="outline-secondary btn-sm">Read More</Button>
                                </Link>
                                {sessionStorage.getItem('username') && <Button onClick={() => deletePost({ id })} variant="outline-secondary btn-sm"><i className="fa fa-trash-o" /></Button>}
                                {sessionStorage.getItem('username') && <Button onClick={() => history.push(`/editdata/${id}`)} variant="outline-secondary btn-sm"><i className="fa fa-pencil" /></Button>}
                            </Card.Body>
                            {/* <Card.Footer className="">2 days ago</Card.Footer> */}
                        </Card>
                    )
                })}
            </CardDeck>
        )
    }
    return (
        <CardDeck>
            {Object.keys(contentData).filter((i) => contentData[i].category === cat).map((id) => {
                const item = contentData[id];
                const abc = item.content.substring(0, 120);
                return (
                    <Card key={id}>
                        <Card.Body >
                            <Card.Title>{item.title}</Card.Title>
                            <p>{item.category}</p>
                            <Card.Text >
                                <pre>
                                    {abc}
                                </pre>
                            </Card.Text>
                            <Link to={`/content/${id}`}>
                                <Button variant="outline-secondary btn-sm">Read More</Button>
                            </Link>
                            {sessionStorage.getItem('username') && <Button onClick={() => deletePost({ id })} variant="outline-secondary btn-sm"><i className="fa fa-trash-o" /></Button>}
                            {sessionStorage.getItem('username') && <Button onClick={() => history.push(`/editdata/${id}`)} variant="outline-secondary btn-sm"><i className="fa fa-pencil" /></Button>}
                        </Card.Body>
                        {/* <Card.Footer className="">2 days ago</Card.Footer> */}
                    </Card>
                )
            })}
        </CardDeck>
    )
}


export default AllContent;