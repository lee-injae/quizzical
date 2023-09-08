import React from "react"
import Answers from "./Answers"
import { decode } from 'html-entities';

import '../App.css'


export default function Questions(props){
    console.log("props.questions ", props.questionObj)
    const {question, correct_answer, incorrect_answers, allAnswers} = props.questionObj

    // const styles = {
    //     color: props.isSelected ? "green" : "white"
    // }


    // console.log("allanswrs", allAnswers)
    const answerElements = allAnswers.map( (answerObj) => (
        <Answers 
            key={Math.random()}
            answer={answerObj.value}
            isSelected={answerObj.isSelected}
            handleClick={props.handleClick}
            answerObj={answerObj}
        />
    ))

    

    //highlight selected answer 

    //save selected answer and compare with correct answer 

    //check answer button imbed

    //display checked answer page 

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