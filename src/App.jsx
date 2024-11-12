import React from 'react'
import { nanoid } from "nanoid"
import { decode } from 'html-entities';

import Start from "./components/Start/Start"
import Quiz from "./components/Quiz/Quiz"
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator"

import './App.css'

const BASEURL = "https://opentdb.com/api.php?amount=5&type=multiple";
const QUIZ_STATES = {
  START: 'START',
  QUIZ_ON: 'QUIZ_ON',
  QUIZ_CHECKED: 'QUIZ_CHECKED'
};

export default function App() {

  const [quizData, setQuizData] = React.useState([])
  const [questionsArr, setQuestionsArr] = React.useState([])
  const [quizState, setQuizState] = React.useState(QUIZ_STATES.START)
  const [counter, setCounter] = React.useState(0)
  const [loading, setLoading] = React.useState(false);

  
  React.useEffect(() => {
    if (quizData.length > 0) {
      updateQuestionsArr()
    }
  }, [quizData])

  function buildApiUrl(categoryNum, difficultyStr) {
    const url = new URL(BASEURL)
    const params = url.searchParams
    params.set('category', categoryNum)
    params.set('difficulty', difficultyStr)
    url.search = params.toString()
    const finalURL = url.toString()
    return finalURL
  }

  async function fetchQuizData(urlStr){
    setLoading(true);
    try {
      const res = await fetch(urlStr)
      const data = await res.json()
      setQuizData(data.results)
      setLoading(false)
    }
    catch(err) {
      console.log("Failed to fetch questions: ", err)
      alert("failed to fetch questions")
      setLoading(false)
    }
  }

  function updateQuestionsArr(){
    const questionWithShuffledAnswerObjects = quizData.map(data => {
      const {incorrect_answers, correct_answer, question} = data
      const decodedCorrectAnswer = decode(correct_answer)
      const decodedQuestion = decode(question)
      const allAnswers = incorrect_answers.map(incorrectAnswer => decode(incorrectAnswer))
      const randNum = Math.floor(Math.random() * 4)
      allAnswers.splice(randNum, 0, decodedCorrectAnswer)

      const newAnswerObjectsArray = allAnswers.map(( answer, index ) => {
        return {
          id: index,
          value: answer,
          isSelected: false,
          isCorrect: false,
          isChecked: false
          }
      })

      return {
        ...data,
        correct_answer: decodedCorrectAnswer,
        question: decodedQuestion,
        id: nanoid(),
        allAnswers: newAnswerObjectsArray
      }
    })        
    console.log("updated QArray", questionWithShuffledAnswerObjects)
    setQuestionsArr(questionWithShuffledAnswerObjects)
  }    
  
  function selectAnswer(e, questionId){
      const clickedValue = e.currentTarget.textContent;
      // console.log(clickedValue, questionId)
      if (quizState === QUIZ_STATES.QUIZ_ON){
        setQuestionsArr(prevQuestionsArr => 
          prevQuestionsArr.map(questionObj => {
            if (questionObj.id === questionId){
              return {
                ...questionObj,
                allAnswers: questionObj.allAnswers.map(answerObj => {
                  if (answerObj.value === clickedValue) {
                    console.log("yes", answerObj.value)
                    return {...answerObj, isSelected: !answerObj.isSelected}
                  } else {
                    console.log("no")
                    return {...answerObj, isSelected: false} 
                  }
                })
              }
            } else {
              return questionObj
            }
          })
        )
    }
    // console.log("after selected", questionsArr)
  }
  // console.log("after selected super", questionsArr)

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

    if (quizState === QUIZ_STATES.QUIZ_ON){
      let newCounter = 0
      const updatedQuestions = questionsArr.map(questionObj => {
        const updatedAnswers = questionObj.allAnswers.map(answerObj => {
          if (answerObj.isSelected) {  
            if (questionObj.correct_answer === answerObj.value){
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
          } else if (questionObj.correct_answer === answerObj.value){  
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
      setQuestionsArr(updatedQuestions)
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

  function startQuiz(category, difficultyStr){
    setLoading(true)
    const url = buildApiUrl(category, difficultyStr)
    fetchQuizData(url)
    setQuizState(QUIZ_STATES.QUIZ_ON)
  }
  
  function replay(){
    setQuizState(QUIZ_STATES.START)
    setQuizData([])
    // fetchQuestions()
  }

  return (
    <>
      {/* Decorative Blobs */}
      <div className="yellow-blob"></div>
      <div className="blue-blob"></div>

      {/* Loading Spinner */}
      {loading && <LoadingIndicator />}

      {/* Main App Content */}
      {!loading && renderQuiz()}
    </>
  );
  
  function renderQuiz() {
    switch(quizState) {
      // Your existing switch-case logic
        case QUIZ_STATES.START:
          return (
            <>
              <Start  
                startQuiz={startQuiz}
                />
            </>)
        case QUIZ_STATES.QUIZ_ON:
          return (
            <div className='quiz-container'>
              <>
                {questionEl}
              </>
              <button 
                className='check-answers-btn' 
                onClick={checkAnswers}
                >
                Check answers
              </button>
            </div>
          );
          case QUIZ_STATES.QUIZ_CHECKED:
            return (
              <div className='quiz-container'>
                <>
                  {questionEl}
                </>
                <footer className='replay-container'>
                  <h4>You scored {counter} / 5 correct answers</h4>
                  <button
                    className='replay-btn'
                    onClick={replay}
                  >
                    Play again
                  </button>
                </footer>
              </div>
            );
          default:
            return <ErrorComponent />;
      }
    }
  }
  

//   return (
//       <div className='app-container'>
//         {(() => {
//           switch(quizState) {
//             case QUIZ_STATES.START:
//               return (
//                 <>
//                   <Start  
//                     startQuiz={startQuiz}
//                     />
//                 </>)
//             case QUIZ_STATES.QUIZ_ON:
//               return (
//                 <div className='quiz-container'>
//                   <>
//                     {questionEl}
//                   </>
//                   <button 
//                     className='check-answers-btn' 
//                     onClick={checkAnswers}>
//                     Check answers
//                   </button>
//                 </div>
//               );
//               case QUIZ_STATES.QUIZ_CHECKED:
//                 return (
//                   <div className='quiz-container'>
//                     <>
//                       {questionEl}
//                     </>
//                     <footer className='replay-container'>
//                       <h4>You scored {counter} / 5 correct answers</h4>
//                       <button
//                         className='replay-btn'
//                         onClick={replay}
//                       >
//                         Play again
//                       </button>
//                     </footer>
//                   </div>
//                 );
//               default:
//                 return <ErrorComponent />;
//           }
//         })()}
//       </div>
//   )
// }
    



