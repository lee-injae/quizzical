import React from "react"

import { decode } from 'html-entities';

export default function Questions(props){
    const {question, correct_answer, incorrect_answers} = props.questionObj

    const styles = {
        color: props.isSelected ? "green" : "white"
    }

    const answerElements = props.shuffledAnswers.map( (answer, index) => (
        <p key={index} className="answer">
            {decode(answer)}
        </p>
    ))

    //highlight selected answer 

    //save selected answer and compare with correct answer 

    //check answer button imbed

    //display checked answer page 

    return(
        <div>
            <div className="question-container">
                Questions: {decode(question)}
            </div>
            <div onClick={(e) => props.handleIsSelected(e)} className="answer-container">
                Answers: {answerElements}
            </div>
        </div>
    )
}