import React from 'react'
import { nanoid } from "nanoid"

import Questions from "./components/Questions"

import './App.css'

function App() {

  const [questionsArr, setQuestionsArr] = React.useState([])
  const [isGameOn, setIsGameOn] = React.useState(false)
  // const [isSelected, setIsSelected] = React.useState(false)
  const [correctAnswerArr, setCorrectAnswerArr] = React.useState([])
  const [selectedAnswerArr, setSelectedAnswerArr] = React.useState([])
  
  
  React.useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&category=23&type=multiple"

    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log('i fire once');
      // console.log(data.results)
      const correctAnswers = []

      const questionsWithShuffledAnswerObjects = data.results.map(question => {
        correctAnswers.push(question.correct_answer)
        
        const allAnswers = [...question.incorrect_answers]
        const randNum = Math.floor(Math.random() * 4)
        allAnswers.splice(randNum, 0, question.correct_answer)
        
        const newAnswerObjectsArray = allAnswers.map( (answer, index ) => {
          return {
            id: index,
            value: answer,
            isSelected: false,
            markedCorrect: ""
          }
        })

        return {
          ...question,
          id: nanoid(),
          allAnswers: newAnswerObjectsArray
        }})
        
        setCorrectAnswerArr(correctAnswers)
        setQuestionsArr(questionsWithShuffledAnswerObjects)
      })
      .catch(err => {
        console.error("Failed to fetch questions: ", err)
      })
  }, [])
   
  function handleIsGameOn(){
    setIsGameOn(prevState => !prevState)
  }

  function handleClick(e, questionId){
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

  function handleBtnClick(){
    console.log("hey", correctAnswerArr)
    console.log(questionsArr)

    const select = questionsArr.reduce((selectedAnswers, questionObj) => {
      const selected = questionObj.allAnswers.filter(answer => answer.isSelected)
      const selectedValues = selected.map(selectedAnswerObj => selectedAnswerObj.value)
      return selectedAnswers.concat(selectedValues)
      }, [])
    console.log("select", select)
    console.log(correctAnswerArr)
    
    for (let choice of select) {
      if (correctAnswerArr.includes(choice)){
        
      }
    }
    // const checked = correctAnswerArr.find(correctAnswer => correctAnswer === choice)

    const contained = correctAnswerArr.includes(select)
    
  }

  const questionEl = questionsArr.map(questionObj => (
    <Questions
        key={questionObj.id}
        questionObj={questionObj}
        handleClick={(e) => handleClick(e, questionObj.id)}
        // handleIsSelected={handleIsSelected}
    /> 
  ))

  const styles = {
    display: isGameOn && "none" 
  }

  return (
    <>
      <div className='start-page' style={styles}>
        <h1 className='title'>Quizzical</h1>
        <button className='start-btn'
            onClick={handleIsGameOn}
        >
          start quiz
        </button>
      </div>
      <div>
      {isGameOn && questionEl}
      {isGameOn && 
        <button 
          className='check-answers-btn'
          onClick={handleBtnClick}
          >
            Check answers
        </button>}
      </div>

    </>
    
  )
}

export default App
