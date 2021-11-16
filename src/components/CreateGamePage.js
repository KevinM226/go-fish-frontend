import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"

export const CreateGamePage = ({ createGame, gameData, setCurrentPage }) => {
    const [gameName, setGameName] = useState('')

    return(
        <div>
            <h1>Welcome to the Create a Game Page!</h1>
            <div>
                <input type = 'text' required 
                placeholder = 'Enter Game Name' value = { gameName } onChange = {(e) => setGameName(e.target.value)}/>
            </div>
            <div>
                <Button color = "green" text = "Start Game" onClick = {() => {
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
                }}/>
            </div>
        </div>
    )
    }
    
    export default CreateGamePage