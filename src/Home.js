import React, {useContext, useEffect} from "react";
import AllContent from './components/AllContent';
import Message from './components/Message';
import MyCarousel from "./components/MyCarousel";
import {RealData} from './App';


const Home = () => {
    
    const realData = useContext(RealData);
    const allCategories = ["All", ...new Set(Object.keys(realData).map((id) => realData[id].category))];

    return (
        <>
            <MyCarousel allCategories={allCategories}/>
            <AllContent realData={realData}/>
            <Message/>
        </>
    )
}


export default Home;