import React from "react"
import "./Dropdown.css"

const categoryArr = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathmatics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"  ]

export default function Dropdown(props){

    const [selections, setSelections] = React.useState({
        category: 9,
        difficulty: "easy"
    })
   
    const updatedCategoryArr = categoryArr.map((category, index) => ({ name: category, num: index + 9 }))

    const handleChange = (e) => {
        console.log("handlechange", e.target)
        setSelections((prevSelections) => ({
            ...prevSelections,
            [e.target.name]: e.target.value,
        }))
        console.log(selections)
    }

    const handleClick = (e) => {
        e.preventDefault()
        props.startQuiz(selections.category, selections.difficulty.toLowerCase())
    }

    const categoryEl = updatedCategoryArr.map(categoryObj => {
        return <option 
                    key={categoryObj.name} 
                    value={categoryObj.num}>
                    {categoryObj.name}
                </option>
    })

    return(
        <form className="dropdown-form">
            <label htmlFor="category"><h4>Category</h4></label>        
            <select 
                id="category" 
                name="category"
                onChange={handleChange}>
                <option value="" disabled>-Select a category-</option>
                {categoryEl}
            </select>
            <label htmlFor="difficulty"><h4>Difficulty</h4></label>
            <select 
                id="difficulty" 
                name="difficulty"
                value={selections.difficulty}
                onChange={handleChange}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
            <button className='start-btn'
                onClick={handleClick}
                >
                Start quiz
            </button>
        </form>
    )
}




