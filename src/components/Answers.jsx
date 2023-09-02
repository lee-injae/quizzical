import React from "react"

import { decode } from 'html-entities';


export default function Answers(props){

    console.log("props: ", props)


    return(
        <div className="answers-container">
            <p 
                className="answer" 
                onClick={props.handleClick}
           >
            {decode(props.answer)}
        </p>
        </div>
    )
}