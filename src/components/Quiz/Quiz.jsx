import React from "react"
import Answer from "../Answer/Answer"
// import { decode } from 'html-entities';

import "./Quiz.css"

export default function Quiz(props){
    const {question, allAnswers} = props.questionObj
    
    const answerElements = allAnswers.map( (answerObj) => (
        <Answer
            key={answerObj.id}
            selectAnswer={props.selectAnswer}
            answerObj={answerObj}
        />
    ))

    return(
        <div className="qa-container">
            <div className="question">
                {question}
            </div>
            <div className="answer-container">
                {answerElements}
            </div>
        </div>
    )
}