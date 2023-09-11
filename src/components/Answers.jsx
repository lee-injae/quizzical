import React from "react"

import '../App.css'


export default function Answers(props){

    const {value, isSelected, isChecked, isIncorrect} = props.answerObj

    console.log("answer comp props: ", props)
    
    const bgColorPick = () => {
        if (isSelected) {
            return "#94D7A2" //selected answer txt color
        } else if (isChecked) {
            return "#D6DBF5" //checked answer bg color
        } else if (isChecked && isIncorrect) {
            return "#F8BCBC" //checked and incorrect answer bg color
        }
    }

    const answerStyles = {
        backgroundColor: bgColorPick(),
        opacity: isSelected ? "1" : "0.5",
        border: isSelected ? "non" : "1px solid #293264",
        cursor: "pointer"
    }

    // const backgroundColorPick = () => {
    //     if (isSelected) {
    //       return "#94D7A2"; // Selected answer color
    //     } else if (isChecked && isIncorrect) {
    //       return "#F8BCBC"; // Incorrect checked answer color
    //     } else if (isChecked) {
    //       return "#D6DBF5"; // Correct checked answer color
    //     }
    //     return "transparent"; // Default background color
    //   };
    
    //   const answerStyles = {
    //     backgroundColor: backgroundColorPick(),
    //     border: isSelected ? "none" : "1px solid #293264",
    //     opacity: isSelected ? "1" : "0.5",
    //     cursor: "pointer",
    //   };



    return(
        <p 
            className="answer" 
            onClick={props.handleClick}
            style={answerStyles}
        >
            {value}
        </p>
        
    )
}