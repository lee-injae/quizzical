import React from 'react'
import { nanoid } from "nanoid"
import { decode } from 'html-entities';

import Start from "./components/Start/Start"
import Quiz from "./components/Quiz/Quiz"

import './App.css'

import { DropdownContext } from './components/Dropdown/Dropdown';

const BASEURL = "https://opentdb.com/api.php?amount=5&type=multiple";
const QUIZ_STATES = {
  START: 'START',
  QUIZ_ON: 'QUIZ_ON',
  QUIZ_CHECKED: 'QUIZ_CHECKED'
};

export default function App() {
  const [questionsArr, setQuestionsArr] = React.useState([])
  const [quizState, setQuizState] = React.useState(QUIZ_STATES.START)
  const [counter, setCounter] = React.useState(0)
  
  React.useEffect(() => {
    fetchQuestions()
  }, [])

  // const {selectedCategoy, selectedDifficulty} =  React.useContext(DropdownContext)

//  const h = BASEURL.split("")

//  h.splice(36, 0, "&category=31&difficulty=easy")
//  const l = h.join("")

//  console.log(l)

  function fetchQuestions(){
    fetch(takeParams())
      .then(res => res.json())
      .then(data => {
        const questionsWithShuffledAnswerObjects = data.results.map(question => {
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
          }
        })        
        setQuestionsArr(questionsWithShuffledAnswerObjects)
      })
      .catch(err => {
        console.error("Failed to fetch questions: ", err)
      })
  }
   
  function selectAnswer(e, questionId){
      const clickedValue = e.currentTarget.textContent;
      
      if (quizState === QUIZ_STATES.QUIZ_ON){
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

  function checkAnswers(){
    //EXAMPLE for how to use array.reduce
    // const selectedAnswersArr = questionsArr.reduce(
    //   (selectedAnswers, questionObj) => {
    //     const selected = questionObj.allAnswers.filter(answer => 
    //       answer.isSelected)
    //     const selectedValues = selected.map(selectedAnswerObj => 
    //       selectedAnswerObj.value)
    //     return selectedAnswers.concat(selectedValues)
    //   }, [])

    if (quizState === "QUIZ_ON"){
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
      }
    )
      setQuestionsArr(updatedQeustions)
      setCounter(newCounter)
      setQuizState(QUIZ_STATES.QUIZ_CHECKED)
    }
  }

  const questionEl = questionsArr.map(questionObj => (
    <Quiz
        key={questionObj.id}
        questionObj={questionObj}
        selectAnswer={(e) => selectAnswer(e, questionObj.id)}
    /> 
  ))

  function startQuiz(str){
    console.log("clicked", str)
    setQuizState(QUIZ_STATES.QUIZ_ON)
  }

  // function takeParams(category = "11", difficulty = "easy"){
  //   const combinedParam = `&category=${category}&difficulty=&${difficulty}`
  //   const tt = BASEURL.split("")
  //   tt.splice(36, 0, combinedParam)
  //   tt.join("")
  //   return tt 
  // }


function takeParams(category = "9", difficulty = "medium") {
    const url = new URL(BASEURL);
    const params = url.searchParams;

    params.set('category', category);
    params.set('difficulty', difficulty);

    url.search = params.toString();

    const finalURL = url.toString();
    return finalURL; // Return the final URL as a string
}

  function replay(){
    setQuizState(QUIZ_STATES.START)
    fetchQuestions()
  }

  return (
      <div className='app-container'>
        {(() => {
          switch(quizState) {
            case QUIZ_STATES.START:
              return (
                <>
                  {/* <DropdownContext.Provider value={{ selectedCategoy, selectedDifficulty }}> */}
                    <Start  
                      startQuiz={startQuiz}
                      />
                  {/* </DropdownContext.Provider> */}
                </>)
            case QUIZ_STATES.QUIZ_ON:
              return (
                <>
                  <div>
                    {questionEl}
                  </div>
                  <button 
                    className='check-answers-btn' 
                    onClick={checkAnswers}>
                    Check answers
                  </button>
                </>
              );
              case QUIZ_STATES.QUIZ_CHECKED:
                return (
                  <>
                    <div>
                      {questionEl}
                    </div>
                    <footer className='replay-container'>
                      <h4>You scored {counter} / 5 correct answers</h4>
                      <button
                        className='replay-btn'
                        onClick={replay}
                      >
                        Play again
                      </button>
                    </footer>
                  </>
                );
              default:
                return <ErrorComponent />;
          }
        })()}
      </div>
  )
}
    



