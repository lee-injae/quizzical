import React from 'react'
import { nanoid } from "nanoid"

import Questions from "./components/Questions"

import './App.css'

function App() {

  const [questionsArr, setQuestionsArr] = React.useState([])
  const [isGameOn, setIsGameOn] = React.useState(false)
  const [isSelected, setIsSelected] = React.useState(false)
  const [selectedAnswer, setSelectedAnswer] = React.useState("")
  
  React.useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&type=multiple"

    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('i fire once');
      // console.log(data.results)
      const questionsWithShuffledAnswers = data.results.map(question => {
        const allAnswers = [...question.incorrect_answers]
        const randNum = Math.floor(Math.random() * 4)
        allAnswers.splice(randNum, 0, question.correct_answer)
        return {
          ...question,
          id: nanoid(),
          allAnswers: allAnswers
        }})
        setQuestionsArr(questionsWithShuffledAnswers)
      })
      .catch(err => {
        console.error("Failed to fetch questions: ", err)
      })
  }, [])

  function handleIsGameOn(){
    setIsGameOn(prevState => !prevState)
  }

  function handleIsSelected(e){
    console.log(e.target)
    setSelectedAnswer(e.target) 
    setIsSelected(prevState => !prevState)
    
  }

  console.log("selection: ", selectedAnswer)

  const questionEl = questionsArr.map(questionObj => (
    <Questions
        key={questionObj.id}
        questionObj={questionObj}
        shuffledAnswers={questionObj.allAnswers}
        handleIsSelected={handleIsSelected}
        isSelected={isSelected}
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
