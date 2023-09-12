import React from "react"

export default function Start(props){
    
    console.log("Current quizState:", props.quizState);

    return(
        <div className='start-page'>
            <div className='blob-top-right'>
                <div className='blob-5-top-right lemony-medium'></div>
            </div>
            <h1 className='title'>History Quiz App</h1>
            <h3 className='title-sub'>Once upon a time...</h3>
            <button className='start-btn'
                onClick={props.startQuiz}
                >
                Start quiz
            </button>
            <div className='blob-bot-left'>
                <div className='blob-5-bot-left baby-medium'></div>
            </div>
        </div>              
    )
}