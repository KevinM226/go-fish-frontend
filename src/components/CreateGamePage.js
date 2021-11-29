import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"

export const CreateGamePage = ({ gameData, setCurrentPage, setMongoPlayerID, userInputPlayerName, setMongoGameID, setGameData }) => {
    const [gameName, setGameName] = useState("")

    const createNewGame = async ( gName, pName ) => {
        pName = userInputPlayerName
        try {
            console.log("This is the name that the player will create with", pName)
            const createdPlayer = await Axios.post("http://192.168.1.138:8080/player/create", { name: pName });
            setMongoPlayerID(createdPlayer.data._id)
            console.log("This is the name that the game will create with", gName)
            const createdGame = await Axios.post("http://192.168.1.138:8080/game/create", { name: gName, players: createdPlayer.data._id, playerCount: 1, turn: pName });
            setMongoGameID(createdGame.data._id)
        } catch (err) {
            console.error(err)
        }
        
    }

    //used to make UI elements look nice
    const styles = ({
        spaceInput: {
            width: 200,
            height: 25,
            marginBottom: 50
        },
    })

    return(
        <div>
            <div>
            <h1 >
                Welcome to the Create a Game Page!
            </h1>
            <div>
                <input type = 'text' required 
                placeholder = 'Enter Game Name' value = { gameName } onChange = {(e) => setGameName(e.target.value)} style={styles.spaceInput}/>    
            </div>
            <div>
                <Button color = "white" text = "Start Game" onClick = {() => {
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
                    
                    if(nameFound == false) {
                        createNewGame(gameName, userInputPlayerName).then(() => {
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