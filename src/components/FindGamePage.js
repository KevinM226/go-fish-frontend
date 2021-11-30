//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"
import ipAddress from '../ipStore';

//Landing page component
export const FindGamePage = ({ gameData, cardData, setCurrentPage, userInputPlayerName, setGameData, setMongoPlayerID, setMongoGameID, mongoPlayerID, mongoGameID }) => {
    const [gameName, setGameName] = useState("")
    const holdCards = []

    const joinGame = async ( gName, pName ) => {
        try {
            const foundGame = await Axios.get(`http://${ipAddress}:3003/game/findOne/${gName}`)
            const holdGame = await foundGame.data._id
            console.log(holdGame)
            setMongoGameID(holdGame)
            fillHand()
            const createdPlayer = await Axios.post(`http://${ipAddress}:3003/player/create`, { name: pName, cards: holdCards })
            const holdPlayer = await createdPlayer.data._id
            setMongoPlayerID(holdPlayer)
            const addedCount = await Axios.put(`http://${ipAddress}:3003/game/updateCount/${foundGame.data._id}`)
            const holdPlayerIDs =  await foundGame.data.players
            holdPlayerIDs.push(createdPlayer.data._id)
            const updatedGame = await Axios.put(`http://${ipAddress}:3003/game/addPlayer/${foundGame.data._id}`, { playerId: holdPlayerIDs })
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
        const res = await Axios.get(`http://${ipAddress}:3003/game/findAll`)
        const data = await res.data
        return data
    }

    //calls the fetch rooms and changes state of roomData
    const getGames = async() => {
        const gamesFromBackend = await fetchGames()
        setGameData(gamesFromBackend)
    }

    const generateCards = () => {
        var suit = Math.floor((Math.random() * 4) + 1);
        var value = Math.floor((Math.random() * 12) + 0);

        var holdCards = []
        switch (suit) {
            case 1:
                for (let i = 0; i < 52; i++){
                    if(cardData[i].suit == "Red Hearts"){
                        holdCards.push(cardData[i])
                    }
                }
                break;
            case 2:
                for (let i = 0; i < 52; i++){
                    if(cardData[i].suit == "Red Diamonds"){
                        holdCards.push(cardData[i])
                    }
                }
                break;
            case 3:
                for (let i = 0; i < 52; i++){
                    if(cardData[i].suit == "Black Clubs"){
                        holdCards.push(cardData[i])
                    }
                }
                break;
            case 4:
                for (let i = 0; i < 52; i++){
                    if(cardData[i].suit == "Black Spades"){
                        holdCards.push(cardData[i])
                    }
                }
                break;
        }

        return(holdCards[value])
    }

    const fillHand = () => {
        var holdVal
        for(let i = 0; i < 7; i++){
            holdVal = generateCards()
             holdCards[i] = holdVal._id
        }
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
                    placeholder = 'Enter Game Name' value = { gameName } onChange = {(e) => setGameName(e.target.value)} style={styles.spaceInput}/>
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
                <div>
                    <Button text = "Back To Menu" color = "white" onClick = {() => {
                        setCurrentPage("LandingPage")
                    }} />
                </div>
            </div>
        </div> 
    )
}

export default FindGamePage