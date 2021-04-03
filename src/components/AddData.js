import React, { useState , useEffect} from 'react';
import firebase from '../util/firebase';
import { Form, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ShowModal from './ShowModal';
import { render } from '@testing-library/react';
import { Link, useHistory } from 'react-router-dom';
import cpat from './Pics/cardPat1.jpg'
import { RealData } from '../App';
import Loader from 'react-spinners/ClipLoader'

const Styles = styled.div`
    *{
        box-sizing:border-box;
    }
    
    .container{
        background-image: url(${cpat});
        padding: 2%;
        margin-top: 10%;
        margin-bottom: 10%;
    }
    .child{
        width: 100%;
        margin-bottom:5%;
    }
    @media (min-width: 768px){
        .child{
        width:46%;
        margin: 2%;
        margin-bottom:10%;
    }
    }
@media screen and (max-width: 990px){
    .container{
        margin-top: 23%;
        margin-bottom: 15%;
    }
}
@media screen and (max-width: 580px){
        .container{
        margin-top: 20%;
        margin-bottom: 20%;
    }
}
`
const AddData = () => {
    const realData = React.useContext(RealData);
    const history = useHistory();
    const [subsList, setSubsList] = useState({});
    const [loading, setLoading] = useState(true);
    const DB = firebase.database().ref();

    if (!sessionStorage.getItem("username")) {
        history.push("/");
    }

    const allCategories = ["All", ...new Set(Object.keys(realData).map((id) => realData[id].category))];

    useEffect(() => {
        DB.child('email').on('value', snapshot => {
            setLoading(true);
            if (snapshot.val() != null) {
                setSubsList({
                    ...snapshot.val(),
                })
            }
            setLoading(false);
        })
    }, [DB]);

    const [data, setData] = useState({
        title: "",
        category: "",
        content: ""
    });

    const handleOnChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.category && data.title && data.content) {
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
        else {
            render(<ShowModal message="Please fill all sections carefully." title="Empty Input" />)
        }
    }


    return (
        <Styles>
            <Container >
                <Form className="child" style={{ float: "left" }} onSubmit={handleOnSubmit} autoComplete="off">
                    <h1>Add </h1><br />
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={handleOnChange} type="text" value={data.title} name="title" placeholder="Title" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control onChange={handleOnChange} type="text" value={data.category} name="category" placeholder="Category" />
                        <Form.Text id="exampleForm.ControlInput2" muted>
                            <span>E.g</span>{allCategories.filter((i) => i !== 'All').map((cat) => {
                                return (<span key={cat}>,&emsp;{cat}</span>
                                )
                            })}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" value={data.content} onChange={handleOnChange} as="textarea" rows={15} placeholder="Type or Paste Content here" />
                    </Form.Group>
                    <Button variant="outline-secondary" type="submit">
                        Submit
                    </Button>
                    <Link to="/">
                        <Button style={{ marginLeft: "2%" }} variant="secondary">Back</Button>
                    </Link>
                </Form>
                <SendToSubs loading={loading} subsList={subsList}/>
            </Container>
        </Styles>
    );

}


const SendToSubs = ({loading, subsList}) => {
    const [all, setAll] = useState(false);
    const length = Object.keys(subsList).length;
    const handleToggle = () => {
        console.log(subsList);
        setAll(!all);
    }

    return (
        <Container>
        {
            loading ? 
                <Loader loading={loading} size={50} />
            :
            <Form className="child" style={{ float: "right", marginTop: "0", paddingLeft: "3%", marginBottom: "25%" }} autoComplete="off">
                <h3>Send to Subs </h3>
                    
                <div style={{marginBottom:"2%"}} className="custom-control custom-switch">
                    <input type="checkbox"  onChange={handleToggle} className="custom-control-input" id="customSwitches" />
                    <label className="custom-control-label" for="customSwitches">Select All</label>
                </div>

                {   
                    all 
                    ?
                    <div>
                        <p>{length} SELECTED</p>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            Object.keys(subsList).map((id) => {
                                const data = subsList[id];
                                return (
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>                                                                                                                
                                    </tr>
                                    )
                            })
                            }
                        </tbody>
                    </table>
                   </div>
                    :
                    <div>
                        <p>NONE SELECTED</p>
                    </div>
                }
                        
            </Form>
        }
        </Container>
    )
}
export default AddData;