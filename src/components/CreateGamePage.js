import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"

export const CreateGamePage = ({ gameData, makeGameArr, addButton, setCurrentPage }) => {
    const [gameName, setGameName] = useState("")

    const createNewGame = async ( gName ) => {
        try {
            console.log("This is the name that the game will create with", gName)
            const createdGame = await Axios.post("http://localhost:3003/game/create", { name: gName, playerCount: 1 });
        } catch (err) {
            console.error(err)
        }
        
    }

    return(
        <div>
            <div>
            <h1>Welcome to the Create a Game Page!</h1>
            <div>
                <input type = 'text' required 
                placeholder = 'Enter Game Name' value = { gameName } onChange = {(e) => setGameName(e.target.value)}/>
            </div>
            <div>
                <Button color = "white" text = "Start Game" onClick = {() => {
                    var checkedForName = false
                    var nameFound = false

                    var count = 0
                    while(checkedForName == false && count < gameData.length){
                        if(gameName.toLocaleLowerCase() === gameData[count].name.toLocaleLowerCase()){
                            addButton(gameName)
                            nameFound = true
                            checkedForName = true
                        }
                        count++
                    }
                    if(nameFound == false) {
                        createNewGame(gameName).then(() => {
                            makeGameArr()
                            setCurrentPage("PlayGamePage") 
                        })
                       
                    } else {
                        alert('Game with this name already exists.');
                    }
                }}/>
            </div>
        </div>
        <Button text = "Back To Menu" color = "white" onClick = {() => {
                setCurrentPage("LandingPage")
        }} />
        </div>
    )
}
    
export default CreateGamePage