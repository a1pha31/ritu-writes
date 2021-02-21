import React from "react";
import styled from 'styled-components';
import AllContent from './AllContent';
import Message from './Message';
import MyCarousel from "./components/MyCarousel";
import Subscribe from "./components/Subscribe";



const Home = ({ realData }) => {

    const allCategories = ["All", ...new Set(Object.keys(realData).map((id) => realData[id].category))];

    return (
        <>
            <MyCarousel allCategories={allCategories}/>
            <AllContent realData={realData}/>
            <Message/>
            {/* <Subscribe /> */}
        </>
    )
}


export default Home;