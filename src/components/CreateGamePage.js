import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"
import ipAddress from '../ipStore';

export const CreateGamePage = ({ gameData, cardData, setCurrentPage, setMongoPlayerID, userInputPlayerName, setMongoGameID, setGameData }) => {
    const [gameName, setGameName] = useState("")
    const holdCards = []

    const createNewGame = async ( gName, pName ) => {
        pName = userInputPlayerName
        try {
            fillHand()
            console.log("This is the name that the player will create with", pName)
            const createdPlayer = await Axios.post(`http://${ipAddress}:3003/player/create`, { name: pName, card: holdCards });
            setMongoPlayerID(createdPlayer.data._id)
            console.log("This is the name that the game will create with", gName)
            const createdGame = await Axios.post(`http://${ipAddress}:3003/game/create`, { name: gName, players: createdPlayer.data._id, playerCount: 0 });
            console.log(createdGame)
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