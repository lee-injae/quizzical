import React from "react"

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
        color: props.isSelected ? "green" : "white",
        background: colorPick(props.answerObj.markedCorrect),

    }


    return(
        <div className="answers-container">
            <p 
                className="answer" 
                onClick={props.handleClick}
                style={styles}
           >
            {props.answer}
        </p>
        </div>
    )
}