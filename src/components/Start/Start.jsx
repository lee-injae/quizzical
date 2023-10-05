import React from "react"
import Dropdown from "../Dropdown/Dropdown"

import "./Start.css"

export default function Start(props){

    return(
        <div className='start-page'>
            <h1 className='title'>Quiz App</h1>
            <h3 className='title-sub'>Road to trivia champion: take one quiz a day</h3>
            <Dropdown
                startQuiz={props.startQuiz}
            />
        </div>              
    )
}