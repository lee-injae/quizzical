import React from "react"

import '../App.css'


export default function Answers(props){

    console.log("props: ", props)
    
    function colorPick(stringIndicator){
        if (stringIndicator === "true") {
            return "purple"
        } else if (stringIndicator === "false") {
            return "red"
        }
    }
    

    const styles = {
        // color: props.isSelected ? "blue" : "white",
        background: props.answerObj.isIncorrect && "red" 

    }


    return(
        <p 
            className="answer" 
            onClick={props.handleClick}
            style={styles}
        >
            {props.answer}
        </p>
        
    )
}