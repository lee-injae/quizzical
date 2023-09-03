import React from "react"

import { decode } from 'html-entities';


export default function Answers(props){

    console.log("props: ", props)

    const styles = {
        color: props.isSelected ? "green" : "white"
    }


    return(
        <div className="answers-container">
            <p 
                className="answer" 
                onClick={props.handleClick}
                style={styles}
           >
            {decode(props.answer)}
        </p>
        </div>
    )
}