import React from "react"

import '../App.css'


export default function Answers(props){

    const {value, isSelected, isChecked, isIncorrect} = props.answerObj

    console.log("answer comp props: ", props)
    
    // function colorPick(stringIndicator){
    //     if (stringIndicator === "true") {
    //         return "purple"
    //     } else if (stringIndicator === "false") {
    //         return "red"
    //     }
    // }
    

    const styles = {
        background: isSelected && "#D6DBF5",
        border: isSelected && "none",
        // background: props.answerObj.isChecked && "#94D7A2"
    }

    const newStyle = {
        ...styles,
        background: isSelected && "#94D7A2",
        opacity: !isSelected && "0.5"    
    }



    return(
        <p 
            className="answer" 
            onClick={props.handleClick}
            style={isChecked ? newStyle : styles}
        >
            {value}
        </p>
        
    )
}