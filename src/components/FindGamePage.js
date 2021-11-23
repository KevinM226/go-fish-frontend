//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"


//Landing page component
export const FindGamePage = ({ gameData, setCurrentPage, userInputPlayerName, setGameData, setMongoPlayerID, setMongoGameID }) => {
    const [gameName, setGameName] = useState("")

    const joinGame = async ( gName, pName ) => {
        try {
            const foundGame = await Axios.get(`http://localhost:3003/game/findOne/${gName}`)
            setMongoGameID(foundGame.data._id)
            const createdPlayer = await Axios.post("http://localhost:3003/player/create", { name: pName })
            setMongoPlayerID(createdPlayer.data._id)
            const holdPlayerID = createdPlayer.data._id
            const addedCount = await Axios.put(`http://localhost:3003/game/updateCount/${foundGame.data._id}`)
            console.log("The updated player count is:")
            console.log(addedCount.data.playerCount)
            const updatedGame = await Axios.put(`http://localhost:3003/game/addPlayer/${foundGame.data._id}`, { playerId: holdPlayerID })
            console.log("The updated game is:")
            console.log(updatedGame)
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

    
    //fetch all the Games
    const fetchGames = async () => {
        const res = await Axios.get("http://localhost:3003/game/findAll")
        const data = await res.data
        return data
    }

    //calls the fetch rooms and changes state of roomData
    const getGames = async() => {
        const gamesFromBackend = await fetchGames()
        setGameData(gamesFromBackend)
    }

    getGames()

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
                            joinGame(gameName, userInputPlayerName).then(() => {
                                setCurrentPage("PlayGamePage")
                            })
                        } else {
                            alert('Game with this name does not exist. If the game has been created try pressing the refresh games button');
                        }
                    }} />
                </div>
                <div>
                    <Button text = "Refresh Games" color = "white" onClick = {() => {
                        getGames()
                    }} />
                </div>
            </div>
            
        </div> 
    )
}

export default FindGamePage