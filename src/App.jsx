import React from 'react'
import { nanoid } from "nanoid"
import { decode } from 'html-entities';

import Questions from "./components/Questions"

import './App.css'

function App() {
  const [questionsArr, setQuestionsArr] = React.useState([])
  const [isQuizOn, setIsQuizOn] = React.useState(false)
  const [isQuizChecked, setIsQuizChecked] = React.useState(false)
  const [correctAnswersArr, setCorrectAnswersArr] = React.useState([])
  // const [selectedAnswerArr, setSelectedAnswerArr] = React.useState([])
  const [counter, setCounter] = React.useState(0)
  
  React.useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&category=23&difficulty=medium&type=multiple"

    fetch(url)
    .then(res => res.json())
    .then(data => {
      const correctAnswers = []

      const questionsWithShuffledAnswerObjects = data.results.map(question => {
        correctAnswers.push(decode(question.correct_answer))
        const allAnswers = [...question.incorrect_answers]
        const randNum = Math.floor(Math.random() * 4)
        allAnswers.splice(randNum, 0, question.correct_answer)
        
        const newAnswerObjectsArray = allAnswers.map( (answer, index ) => {
          return {
            id: index,
            value: decode(answer),
            isSelected: false,
            isCorrect: false,
            isChecked: false
          }
        })

        return {
          ...question,
          id: nanoid(),
          allAnswers: newAnswerObjectsArray
        }})
        
        setCorrectAnswersArr(correctAnswers)
        setQuestionsArr(questionsWithShuffledAnswerObjects)
      })
      .catch(err => {
        console.error("Failed to fetch questions: ", err)
      })
  }, [isQuizOn])
   
  function handleIsQuizOn(){
    setIsQuizOn(prevState => !prevState)
  }

  function handleIsQuizChecked(){
    setIsQuizChecked(prevState => !prevState)
  }

  function handleClick(e, questionId){
    if (!isQuizChecked){
      const clickedValue = e.target.textContent;
      setQuestionsArr(prevQuestionsArr => {
        return prevQuestionsArr.map(questionObj => {
          if (questionObj.id === questionId){
            return {
              ...questionObj,
              allAnswers: questionObj.allAnswers.map(answer => {
                if (answer.value === clickedValue) {
                  return {...answer, isSelected: !answer.isSelected}
                } else {
                  return {...answer, isSelected: false} 
                }
              })
            }
          } else {
            return questionObj
          }
        })
      })
    } 
  }

  function handleBtnClick(){
    const selectedAnswersArr = questionsArr.reduce(
      (selectedAnswers, questionObj) => {
        const selected = questionObj.allAnswers.filter(answer => 
          answer.isSelected)
        const selectedValues = selected.map(selectedAnswerObj => 
          selectedAnswerObj.value)
        return selectedAnswers.concat(selectedValues)
      }, [])

    if (!isQuizChecked){
      let newCounter = 0
      const updatedQeustions = questionsArr.map(questionObj => {
        let correctAnswer = questionObj.correct_answer
        const updatedAnswers = questionObj.allAnswers.map(answerObj => {
          if (answerObj.isSelected) {  
            if (correctAnswer === answerObj.value){
              newCounter++
              return {
                ...answerObj,
                isChecked: true,
                isCorrect: true
              }
            } else {
              return {
                ...answerObj, 
                isCorrect: false,
                isChecked: true
              } 
            }
          } else if (correctAnswer === answerObj.value){  
            return {
              ...answerObj,
              isCorrect: true, 
              isChecked: true
            }
          } else {
            return {
              ...answerObj,
              isChecked: true
            }
          }
        })
      return {...questionObj, allAnswers: updatedAnswers}
    })

    setQuestionsArr(updatedQeustions)
    setCounter(newCounter)
    setIsQuizChecked(true)
    }
  }

  const questionEl = questionsArr.map(questionObj => (
    <Questions
        key={questionObj.id}
        questionObj={questionObj}
        handleClick={(e) => handleClick(e, questionObj.id)}
        correctAnswersArr={correctAnswersArr}
    /> 
  ))

  const styles = {
    display: isQuizOn ? "none" : "block" 
  }

  function replay(){
    setIsQuizOn(false)
    setIsQuizChecked(false)
  }

  return (
    // Start view
    <div className='app-container'>

      <div className='start-page' style={styles}>
        <div className='blob-top-right'>
          <div className='blob-5-top-right lemony-medium'></div>
        </div>
        <h1 className='title'>History Quiz App</h1>
        <h3 className='title-sub'>Once upon a time...</h3>
        <button className='start-btn'
            onClick={handleIsQuizOn}
        >
          Start quiz
        </button>
        <div className='blob-bot-left'>
          <div className='blob-5-bot-left baby-medium'></div>
        </div>
      </div>

     {/* Questions and Answers view */}
      <div className='s'>
      {isQuizOn && questionEl}
      {isQuizOn && 
        <div className='check-answers-container'>
          <button 
            className='check-answers-btn'
            onClick={handleBtnClick}
          >
            Check answers
          </button>
        </div>
      }

        {isQuizChecked && 
        <div>
            <h3>You scored {counter} / 5   correct answers</h3>
            <button
              className='replay-btn'
              onClick={replay}
              >
              Replay
            </button>
        </div> }

      </div>
    </div>
  )
}

export default App
