import React from 'react'
import { nanoid } from "nanoid"
import { decode } from 'html-entities';

import Start from "./components/Start/Start"
import Quiz from "./components/Quiz/Quiz"

import './App.css'

const URL = "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"
const BASEURL = "https://opentdb.com/api.php?amount=5&type=multiple"

const categoryArr = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathmatics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"  ]


const QUIZ_STATES = {
  START: 'START',
  QUIZ_ON: 'QUIZ_ON',
  QUIZ_CHECKED: 'QUIZ_CHECKED'
};

function App() {
  const [questionsArr, setQuestionsArr] = React.useState([])
  const [quizState, setQuizState] = React.useState(QUIZ_STATES.START)
  const [counter, setCounter] = React.useState(0)

  React.useEffect(() => {
    fetchQuestions()
  }, [])


 const h = BASEURL.split("")

 h.splice(36, 0, "&category=31&difficulty=easy")
 const l = h.join("")

 console.log(l)

  function fetchQuestions(){
    fetch(l)
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

  function startQuiz(){
    setQuizState(QUIZ_STATES.QUIZ_ON)
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
              return <Start 
                // quizState={quizState} 
                startQuiz={startQuiz}
                />;            
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
    
export default App



