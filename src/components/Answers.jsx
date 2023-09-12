import React from "react"

import '../App.css'


export default function Answers(props){

    const {value, isSelected, isChecked, isCorrect} = props.answerObj

    console.log("answer comp props: ", props)
    
    const bgColorPick = () => {
        if (isSelected) {
            if (isCorrect) {
                return "#94D7A2"  // green
            } else if (!isCorrect && isChecked) {
                return "#F8BCBC" // red
            }
        return "#D6DBF5" // blue
        } else if (!isSelected && isCorrect){
            return "#94D7A2" // green
        }
         
        
        // "#D6DBF5"
        // else if (isCorrect || (isSelected && isCorrect)) {
        //     return "#94D7A2" //checked answer bg color - green
        // } else if (!isCorrect && isSelected) {
        //     return "#F8BCBC" //checked and incorrect answer bg color
        // } else {
        //     return "transparent"
        // }
    }

    // const opacityColorPick = () => {
    //     if (isChecked && !isSelected) {
    //         return "1" //selected answer txt color
    //     } else if (isChecked) {
    //         return "#94D7A2" //checked answer bg color
    //     } else if (isChecked && isIncorrect) {
    //         return "#F8BCBC" //checked and incorrect answer bg color
    //     } else {
    //         return "transparent"
    //     }
    // }

    const answerStyles = {
        backgroundColor: bgColorPick(),
        opacity: (isChecked && !isCorrect) ? "0.5" : "1",
        border: (isSelected || isCorrect) ? "none" : "1px solid #293264",
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