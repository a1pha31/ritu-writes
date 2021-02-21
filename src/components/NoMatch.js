import React from "react";
import styled from 'styled-components'

const Styles = styled.div`
    .container {
        margin-top:20%;
        margin-left:5%;
    }
    h2{
        font-family: cursive;
        margin-bottom:3%;
    }
`
const NoMatch = () => {
    return (
        <Styles>
            <div className="container">
                    <h2>This page is unavailabe.</h2>
                    <a className="btn btn-outline-secondary" href="/">Back</a>
            </div>
        </Styles>
    )
}

export default NoMatch;