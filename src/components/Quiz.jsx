import React from "react"
import Answers from "./Answers"
import { decode } from 'html-entities';

import '../App.css'

export default function Quiz(props){
    const {question, allAnswers} = props.questionObj
    console.log("props of Quiz", props)
    const answerElements = allAnswers.map( (answerObj) => (
        <Answers 
            key={answerObj.id}
            selectAnswer={props.selectAnswer}
            answerObj={answerObj}
        />
    ))

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