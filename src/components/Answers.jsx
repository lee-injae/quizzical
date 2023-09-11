import React from "react"

import '../App.css'


export default function Answers(props){

    console.log("answer comp props: ", props)
    
    // function colorPick(stringIndicator){
    //     if (stringIndicator === "true") {
    //         return "purple"
    //     } else if (stringIndicator === "false") {
    //         return "red"
    //     }
    // }
    

    const styles = {
        background: props.isSelected && "#D6DBF5",
        border: props.isSelected && "none"
        // background: props.answerObj.isIncorrect && "red" 

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