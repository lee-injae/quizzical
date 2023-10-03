import React from "react"

import "./Start.css"

const categoryArr = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathmatics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"  ]

let num = 9

const updatedCategoryArr = categoryArr.reduce((acc, category) => {
    acc.push({ name: category, num: num++ })
    return acc
}, [])


export default function Start(props){

    const categoryEl = updatedCategoryArr.map(categoryObj => {
        return <option 
                    key={categoryObj.name} 
                    value={categoryObj.name}>
                    {categoryObj.name}
                </option>
    })
    
    return(
        <div className='start-page'>
            <h1 className='title'>History Quiz App</h1>
            <h3 className='title-sub'>Once upon a time...</h3>
            <form>
                <label for="category">Category</label>        
                <select id="category" name="category">
                    <option value="" disabled>-----Select a category-----</option>
                    {categoryEl}
                </select>
                <label for="difficulty">Difficulty</label>
                <select id="difficulty" name="difficulty">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
                <button className='start-btn'
                    onClick={() => props.startQuiz()}
                    >
                    Start quiz
                </button>
            </form>
            
            
        </div>              
    )
}