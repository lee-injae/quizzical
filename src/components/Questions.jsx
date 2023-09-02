import React from "react"
import Answers from "./Answers"
import { decode } from 'html-entities';

export default function Questions(props){
    // console.log(props.questionObj)
    const {question, correct_answer, incorrect_answers, allAnswers} = props.questionObj

    const styles = {
        color: props.isSelected ? "green" : "white"
    }

    function handleClick(id, isSelected){
        console.log(id, isSelected)

    }

    const newAnswerObjectsArray = allAnswers.map( (answer, index) => {
        return {
            id: index,
            value: answer,
            isSelected: false
        }
    })


    const answerElements = newAnswerObjectsArray.map( (answerObj) => (
        <Answers 
            key={answerObj.index} 
            answer={answerObj.value}
            isSelected={answerObj.isSelected}
            handleClick={() => handleClick(answerObj.id, answerObj.isSelected)}
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