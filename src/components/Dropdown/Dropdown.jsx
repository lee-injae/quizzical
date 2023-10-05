import React from "react"
import "./Dropdown.css"

const DropdownContext = React.createContext()

export default function Dropdown(props){

    const [selectedCategoryNum, setSelectedCategoryNum] = React.useState(9)
    const [selectedDifficulty, setSelectedDifficulty] = React.useState("medium")

    const categoryArr = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathmatics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"  ]
    const updatedCategoryArr = categoryArr.map((category, index) => ({ name: category, num: index + 9 }))
    const stateSetters = {
        category: setSelectedCategoryNum,
        difficulty: setSelectedDifficulty
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        stateSetters[name](value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        props.startQuiz(selectedCategoryNum,selectedDifficulty.toLowerCase())
    }

    console.log(selectedCategoryNum, selectedDifficulty)

    const categoryEl = updatedCategoryArr.map(categoryObj => {
        return <option 
                    key={categoryObj.name} 
                    value={categoryObj.num}>
                    {categoryObj.name}
                </option>
    })

    // console.log(props)

    return(
        <form className="dropdown-form">
            <label htmlFor="category"><h4>Category</h4></label>        
            <select 
                id="category" 
                name="category"
                onChange={handleChange}>
                <option value="" disabled>-----Select a category-----</option>
                {categoryEl}
            </select>
            <label htmlFor="difficulty"><h4>Difficulty</h4></label>
            <select 
                id="difficulty" 
                name="difficulty"
                value={selectedDifficulty}
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


export { DropdownContext }

