import React from "react"

import "./Start.css"

export default function Start(props){
    
    return(
        <div className='start-page'>
            <h1 className='title'>History Quiz App</h1>
            <h3 className='title-sub'>Once upon a time...</h3>
            <button className='start-btn'
                onClick={props.startQuiz}
                >
                Start quiz
            </button>
        </div>              
    )
}