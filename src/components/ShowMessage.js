import React, { useEffect, useState } from 'react';
import firebase from '../util/firebase';
import styled from 'styled-components';
import cpat from './Pics/cardPat1.jpg'
import emailjs, {init} from 'emailjs-com';
import ShowModal from './ShowModal';
import { render } from '@testing-library/react';
import {Link, useHistory} from 'react-router-dom';

const Styles = styled.div`
    .container{
        background-image: url(${cpat});
        margin-top:5%;
        margin-bottom:5%;
        /* text-align:center; */
    }
    td{
        font-family:cursive;
    }
    .replyForm{
        margin-left:10%;
        padding-left:5%;
    }
    pre {
        font-family:cursive;
        white-space: pre-wrap;
        word-break: break-word;
    }
    
    @media screen and (max-width:990px){
        .container{
        margin-top:10%;
        margin-bottom:10%;
        /* text-align:center; */
    }
    .replyForm{
        margin-bottom: 20%;
        padding-left:5%;
    }
    h2{
        margin-top:4%;
    }
    .replyForm{
        margin-left:auto;
        padding-left:auto;
    }
    }
`
const ShowMessage = () => {
    const history = useHistory();
        if (!sessionStorage.getItem("username")) {
            history.push("/");
    }
    init("user_snMRHQ7aN070iSWaTOs8R");

    const SERVICE_ID = 'service_9xar3y4';
    const TEMPLATE_ID = 'template_62sdjzq';
    const DB = firebase.database().ref();
    const [realData, setRealData] = useState({});

    const [rData, setRData] = useState({
        name :"",
        email :"",
        message :""
    })
    useEffect(() => {
        DB.child('message').on('value', snapshot => {
            if (snapshot.val() != null) {
                setRealData({
                    ...snapshot.val()
                })
            }
        })
    }, [])

    const replyThis = (id) => {
        console.log(id);
        const toReply = Object.keys(realData).filter((i) => i === id).map((item) =>{
            return realData[item];
        })
        setRData({
            ...rData,
            name: toReply[0].name,
            email: toReply[0].email
        })
        
        console.log(toReply[0].name);
    }

    const handleMessage = (e) =>{
        setRData({
            ...rData,
            message: e.target.value
        })
    }
    
    const sendReply = (e) =>{
        e.preventDefault();
        console.log(rData.name,rData.email,rData.message);

        var templateParams = {
            reply_to : rData.email,
            to_name : rData.name,
            message : rData.message
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                if(response.status === 200){
                    render(<ShowModal message="Your reply was sent successfully." title="Reply" />)
                }
                else{
                    render(<ShowModal message="There was an error.\nPlease try again!!" title="Reply" />)
                }
            }, function (error) {
                render(<ShowModal message="There was an error.\nPlease try again!!" title="Reply" />)
                console.log('FAILED...', error);
            });
        
        setRData({
            name: "",
            email: "",
            message: ""
        })
    }


    return (
        <Styles>
            <div className="container row">
                <div className=" container col-md-8 col-lg-6 col-sm-12">
                    <h2 style={{ textAlign: 'center' }}>Messages</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Message</th>
                                <th scope="col">Reply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(realData).reverse().map((id) => {
                                return (
                                    <tr key={id} >
                                        <td>{realData[id].name}</td>
                                        <td><pre> {realData[id].message}</pre></td>
                                        <td><Link to="#replyForm" onClick={() => replyThis(id)} className="btn btn-sm btn-outline-secondary">Reply</Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div id="replyForm" onSubmit={sendReply} className=" container col-md-8 col-lg-6 col-sm-12">
                <form className="replyForm" autoComplete="off">
                    <h2>Reply</h2>
                    <div className="form-group ">
                        <label htmlFor="exampleFormControlInput1">Name</label>
                        <input type="text" value={rData.name} className="form-control" name="name" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1" >Email</label>
                            <input type="text" value={rData.email} className="form-control" name="email" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Message</label>
                        <pre>
                            <textarea className="form-control" value={rData.message} name="message" onChange={handleMessage}  rows="6" />
                        </pre>
                    </div>
                    <input value="Reply" type="submit" className="btn btn-outline-secondary" />
                </form>
                </div>
            </div>
        </Styles>
    );
}

export default ShowMessage;