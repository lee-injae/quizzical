import React from 'react'
import { nanoid } from "nanoid"

import Questions from "./components/Questions"

import './App.css'

function App() {

  const [questionsArr, setQuestionsArr] = React.useState([])
  const [isGameOn, setIsGameOn] = React.useState(false)
  // const [isSelected, setIsSelected] = React.useState(false)
  const [selectedAnswer, setSelectedAnswer] = React.useState("")
  const [correctAnswerArr, setCorrectAnswerArr] = React.useState([])
  
  React.useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&category=23&type=multiple"

    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('i fire once');
      // console.log(data.results)
      const correctAnswers = []
      const questionsWithShuffledAnswers = data.results.map(question => {
        correctAnswers.push(question.correct_answer)
        const allAnswers = [...question.incorrect_answers]
        const randNum = Math.floor(Math.random() * 4)
        allAnswers.splice(randNum, 0, question.correct_answer)
        return {
          ...question,
          id: nanoid(),
          allAnswers: allAnswers
        }})
        setCorrectAnswerArr(correctAnswers)
        setQuestionsArr(questionsWithShuffledAnswers)
      })
      .catch(err => {
        console.error("Failed to fetch questions: ", err)
      })
  }, [])

  function handleIsGameOn(){
    setIsGameOn(prevState => !prevState)
  }

  function handleIsSelected(clickedAnswer){ 
    // setIsSelected(prevState => !prevState)
    // setSelectedAnswer(clickedAnswer)
    console.log("clickedanswer: ", clickedAnswer)
  }

  // console.log("selection: ", selectedAnswer)

  const questionEl = questionsArr.map(questionObj => (
    <Questions
        key={questionObj.id}
        questionObj={questionObj}
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
      {isGameOn && <button className='check-answers-btn'>Check answers</button>}
      </div>

    </>
    
  )
}

export default App
