import React from 'react'
import { nanoid } from "nanoid"

import Questions from "./components/Questions"

import './App.css'

function App() {

  const [questionsArr, setQuestionsArr] = React.useState([])
  const [isGameOn, setIsGameOn] = React.useState(false)
  // const [isSelected, setIsSelected] = React.useState(false)
  // const [selectedAnswer, setSelectedAnswer] = React.useState("")
  const [correctAnswerArr, setCorrectAnswerArr] = React.useState([])
  
  React.useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&category=23&type=multiple"

    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log('i fire once');
      // console.log(data.results)
      // const correctAnswers = []

      const questionsWithShuffledAnswerObjects = data.results.map(question => {
        // correctAnswers.push(question.correct_answer)
        
        const allAnswers = [...question.incorrect_answers]
        const randNum = Math.floor(Math.random() * 4)
        allAnswers.splice(randNum, 0, question.correct_answer)
        
        const newAnswerObjectsArray = allAnswers.map( (answer, index ) => {
          return {
            id: index,
            value: answer,
            isSelected: false
          }
        })

        return {
          ...question,
          id: nanoid(),
          allAnswers: newAnswerObjectsArray
        }})
        
        // setCorrectAnswerArr(correctAnswers)
        setQuestionsArr(questionsWithShuffledAnswerObjects)
      })
      .catch(err => {
        console.error("Failed to fetch questions: ", err)
      })
  }, [])
   
  function handleIsGameOn(){
    setIsGameOn(prevState => !prevState)
  }

  const array = [1, 30, 39, 29, 10, 13];

const isBelowThreshold = (currentValue) => currentValue < 40;

console.log(array.every(isBelowThreshold));
// Output: true, because all numbers in the array are less than 40.


  function handleClick(e){
    const clickedValue = e.target.textContent;
    
    

    setQuestionsArr(prevQuestionsArr => prevQuestionsArr.map(questionObj => ({
      ...questionObj,
      allAnswers: questionObj.allAnswers.map(answer => (
        answer.value === clickedValue    
          ? { ...answer, isSelected: !answer.isSelected } 
          : answer
      ))
    })));
  }
  
  function handleClick(e){
    const clickedValue = e.target.textContent;

    setQuestionsArr(prevQuestionsArr => prevQuestionsArr.map(questionObj => ({
      ...questionObj, 
      allAnswers: questionObj.allAnswers.map(answer => (
        answer.value === clickedValue
          ? {...answer, isSelected: !answer.isSelected} 
          : answer 
        ))
    })))
  }

  const questionEl = questionsArr.map(questionObj => (
    <Questions
        key={questionObj.id}
        questionObj={questionObj}
        handleClick={(e) => handleClick(e)}
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
