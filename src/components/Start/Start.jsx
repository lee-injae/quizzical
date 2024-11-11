import React from "react"
import Dropdown from "../Dropdown/Dropdown"

import "./Start.css"

export default function Start(props){

    return(
        <div className='start-page'>
            <a href="https://www.youtube.com/watch?v=DnNnzZ6Ta2c" target="_blank">
                Ajmal - click here
            </a>
            <br/>

            <h1 className='title'>Quiz App</h1>
            <h3 className='title-sub'>Road to trivia champion: take one quiz a day</h3>
            <Dropdown
                startQuiz={props.startQuiz}
            />
        </div>              
    )
}