import React, {useState, useEffect, createContext} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Home from './Home';
import Contact from './components/Contact';
import NoMatch from './components/NoMatch';
import NavComponent from './components/NavComponent';
import Content from './components/Content';
import AdminLogin from './components/AdminLogin';
import AddData from './components/AddData';
import EditData from './components/EditData';
import firebase from './util/firebase';
import ShowMessage from './components/ShowMessage';
import HashLoader from "react-spinners/HashLoader";
import styled from 'styled-components';


export const RealData = createContext();


const Styles = styled.div`
  .loader{
    position: absolute;
    top: 50%;
    left: 50%;
  }
`
const App = ()=> {
  const DB = firebase.database().ref();
  const [realData, setRealData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DB.child('content').on('value', snapshot => {
      if (snapshot.val() != null) {
        setRealData({
          ...snapshot.val(),
        })
        setLoading(false);
      }
    })
  }, [DB]);

  sessionStorage.setItem('cType', "All");

  return (
    <RealData.Provider value = {realData}>
      {
        loading ?
        <Styles>
          <div className="loader">
              <HashLoader color={"#110F0F"} loading={loading} size={100} />
          </div>
        </Styles>
          :

      <Router basename="/">
        <NavComponent />
        <Container>
        <Switch>
          <Route exact path='/' ><Home/></Route>
          <Route path='/contact' component={Contact}></Route>
          <Route path='/content/:id' children={<Content/>}></Route>
          <Route path='/editdata/:id' children={<EditData />}></Route>
          <Route path='/adddata' children={<AddData />}></Route>
            <Route path='/adminlogin' children={<AdminLogin />}></Route>
          <Route path='/showmessage' children={<ShowMessage />}></Route>
          <Route path='*' component={NoMatch}></Route>
        </Switch>
        </Container>
      </Router>
      }
    </RealData.Provider>
  );
}

export default App;
