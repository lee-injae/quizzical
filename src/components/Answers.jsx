import React from "react"
import '../App.css'

export default function Answers(props){

    const {value, isSelected, isChecked, isCorrect} = props.answerObj

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
    }
         
    const answerStyles = {
        backgroundColor: bgColorPick(),
        opacity: (isChecked && !isCorrect) ? "0.5" : "1",
        border: (isSelected || isCorrect) ? "none" : "1px solid #293264",
    }

    return(
        <p 
            className="answer" 
            onClick={(e) => props.selectAnswer(e)}
            style={answerStyles}
        >
            {value}
        </p>
    )
}