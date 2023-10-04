import React from "react"


const DropdownContext = React.createContext()

export default function Dropdown(props){

    const [selectedCategory, setSelectedCategory] = React.useState("")
    const [selectedDifficulty, setSelectedDifficulty] = React.useState("")

    const categoryArr = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathmatics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"  ]

    let num = 9

    const updatedCategoryArr = categoryArr.reduce((acc, category) => {
        acc.push({ name: category, num: num++ })
        return acc
    }, [])

    const categoryEl = updatedCategoryArr.map(categoryObj => {
        return <option 
                    key={categoryObj.name} 
                    value={categoryObj.name}>
                    {categoryObj.name}
                </option>
    })

    // console.log(props)

    return(
        <form>
            <label htmlFor="category">Category</label>        
            <select id="category" name="category">
                <option value="" disabled>-----Select a category-----</option>
                {categoryEl}
            </select>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
            <button className='start-btn'
                onClick={() => props.startQuiz("dd")}
                >
                Start quiz
            </button>
        </form>
    )
}


export { DropdownContext }

