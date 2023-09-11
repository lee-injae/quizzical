import React from "react"
import Answers from "./Answers"
import { decode } from 'html-entities';

import '../App.css'


export default function Questions(props){
    console.log("props.questions ", props.questionObj)
    const {question, allAnswers} = props.questionObj

    // console.log("allanswrs", allAnswers)
    const answerElements = allAnswers.map( (answerObj) => (
        <Answers 
            key={Math.random()}
            handleClick={props.handleClick}
            answerObj={answerObj}
            correctAnswersArr={props.correctAnswersArr}
        />
    ))

    //save selected answer and compare with correct answer 

    //check answer button imbed

    return(
        <div className="qa-container">
            <div className="question">
                Questions: {decode(question)}
            </div>
            <div className="answer-container">
                {answerElements}
            </div>
        </div>
    )
}