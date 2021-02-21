import React, {useState} from "react";
import { Carousel } from "react-bootstrap";
import p1 from "./Pics/carw.jpg";
import p2 from "./Pics/love.jpg";
import p3 from "./Pics/images.jpg";
import styled from 'styled-components';

var Styles = styled.div`
    h3{
        margin-bottom : 4%;
    }
    .carousel{
        margin-top:6.5%;
        width:100%
    }
    img{
        height: 400px;
    }
    @media screen and (max-width:800px){
        .carousel{
            margin-top:12%;
        }
        img{
            height: 350px;
            width:100%
        }
    }
    
    
`
function MyCarousel({allCategories}) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };



    return (
        <Styles>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                    <img style={{ height: "400px;"}}
                    className="d-block w-100"
                    src={p3}
                    alt="First slide"
                />
                <Carousel.Caption>
                        <h3>ऋतुराज रौशन</h3>
                        {allCategories.filter((i) => i !== 'All').map((cat) => {
                            return (<span key={cat}>&emsp;{cat}</span>
                            )
                        })}
                </Carousel.Caption>
            </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={p1}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        {/* <h3>Third slide label</h3> */}
                        <h3>ये बादल, ये बारिश, ये आसमां और तुम....</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={p2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    {/* <h3>Second slide label</h3> */}
                        <h3>दिल की हसरत नहीं, दिल की आबरू तक जाइए...</h3>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>
        </Styles>
    );
}

export default MyCarousel;