import React from "react";
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Styles = styled.div`
    .container{
        margin-top:10%;
        margin-bottom:10%;
        /* text-align:center; */
    }
    h1{
        margin: 1%;
        margin-left:0;
    }
    
    

    @media screen and (max-width:990px){
        .container{
        margin-top:15%;
        margin-bottom:20%;
        /* text-align:center; */
    }
    h1{
        margin-top:4%;
    }
    }

`

const About = () => {
    const aboutDetails = "<p>सच्चा शायर या कवि वही होता है जो अपनी कही हुई बातों से सुनने वालों &nbsp;को ये एहसास करा सके कि ये उनकी व्यक्तिगत या आस पास की कहानी है, फिर चाहे वो विषय प्रेम हो, समाज हो, या आंतरिक बेचैनी हो। इनका शिल्प भी कुछ इसी तरह का है।</p><p>ऋतुराज रौशन की रचनाओं में काव्य-धर्म भी है और युग-धर्म भी है। उम्र के लिहाज से नए लेकिन सामर्थ्यवान कवि हैं जिन्हें भविष्य बड़े गर्व और गौरव के साथ सुनेगा।</p>";

    return (
        <Styles>
            <Container>
                <h3>About ऋतु राज 'रौशन'</h3><br />
                <p dangerouslySetInnerHTML={{ __html: aboutDetails}}></p>
            <Link to="/">
                <Button variant="outline-secondary">Back</Button>
            </Link>
            </Container>
        </Styles>
    )
}

export default About;