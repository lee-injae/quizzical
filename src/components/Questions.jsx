import React from "react"
import Answers from "./Answers"
import { decode } from 'html-entities';

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
        <div>
            <div className="question-container">
                Questions: {decode(question)}
            </div>
            <div className="answer-container">
                Answers: {answerElements}
            </div>
        </div>
    )
}