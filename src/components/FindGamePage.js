//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"


//Landing page component
export const FindGamePage = ({ gameData, setCurrentPage }) => {
    const [gameName, setGameName] = useState('')

    return(
        <form>
            <div>
                <h1>
                   Enter Game Name to Join Game
                </h1>
                <div>
                    <input type = 'text' required 
                    placeholder = 'Enter Game Name' value = { gameName } onChange = {(e) => setGameName(e.target.value)}/>
                </div>
                <div>
                    <Button text = "Find Entered Game" color = "green" onClick = {() => {
                        setCurrentPage("PlayGamePage")
                        /*var checkedForName = false
                        var nameFound = false

                        var count = 0
                        while(checkedForName == false && count < gameData.length){
                            if(gameName.toLocaleLowerCase() === gameData[count].name.toLocaleLowerCase()){
                                nameFound = true
                                checkedForName = true
                            }

                            count++
                        }
                        if(nameFound === true) {
                            createSuggestion(getSuggestionIDList, movieData[count-1].movieName).then(() => {
                                makeMovieMapArr()
                                setCurrentPage("VotingRound1") 
                            })
                        
                        } else {
                            alert('Game with this name already exists.');
                    }*/
                    }} />
                </div>
            </div>
        </form>  
    )
}

export default FindGamePage