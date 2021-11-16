import Button from "./Button"

export const CreateGamePage = ({ setCurrentPage }) => {
        return(
            <div>
                <h1>Welcome to the Create a Game Page!</h1>
                <div>1
                    <Button color = "green" text = "Start Game" onClick = {() => {
                        setCurrentPage("AddMovieRoom")
                    }}/>
                </div>
                <div>
                    <Button color = "red" text = "Exit" onClick = {() => {
                        setCurrentPage("/")
                    }}/>
                </div>
            </div>
        )
    }
    
    export default CreateGamePage