//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"


//Landing page component
export const FindGamePage = ({ gameData, setCurrentPage }) => {
    const [gameName, setGameName] = useState("")

    const joinGame = async ( gName ) => {
        try {
            console.log("This is the name that the game will create with", gName)
            const foundGame = await Axios.get(`http://localhost:3003/game/findOne/${gName}`)
            console.log(foundGame)
        } catch (err) {
            console.error(err)
        }
        
    }

    return(
        <div>
            <div>
                <h1>
                   Enter Game Name to Join Game
                </h1>
                <div>
                    <input type = 'text' required 
                    placeholder = 'Enter Game Name' value = { gameName } onChange = {(e) => setGameName(e.target.value)}/>
                </div>
                <div>
                    <Button text = "Find Entered Game" color = "white" onClick = {() => {
                        var checkedForName = false
                        var nameFound = false
    
                        var count = 0
                        while(checkedForName == false && count < gameData.length){
                            if(gameName.toLocaleLowerCase() === gameData[count].name.toLocaleLowerCase()){
                                nameFound = true
                                checkedForName = true
                            }
                            count++
                        }
                        if(nameFound == true) {
                            joinGame(gameName).then(() => {
                                setCurrentPage("PlayGamePage")
                                console.log("Found Name") 
                            })
                        } else {
                            alert('Game with this name already exists.');
                        }
                    }} />
                </div>
            </div>
            <Button text = "Back To Menu" color = "white" onClick = {() => {
                setCurrentPage("LandingPage")
            }} />
        </div> 
    )
}

export default FindGamePage