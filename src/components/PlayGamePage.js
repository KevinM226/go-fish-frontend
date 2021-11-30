//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"
import ipAddress from '../ipStore';

//Landing page component
export const PlayGamePage = ({ setCurrentPage, mongoGameID, userInputPlayerName, gameData, playerData, setPlayerData, setGameData, cardData, mongoPlayerID }) => {
    const [currentTurn, setCurrentTurn] = useState("")
    const [currentAction, setCurrentAction] = useState("")
    const [cardImg1, setCardImg1] = useState("")
    const [cardImg2, setCardImg2] = useState("")
    const [cardImg3, setCardImg3] = useState("")
    const [cardImg4, setCardImg4] = useState("")
    const [cardImg5, setCardImg5] = useState("")
    const [cardImg6, setCardImg6] = useState("")
    const [cardImg7, setCardImg7] = useState("")
    const [thisPlayerData, setThisPlayerData] = useState([])
    const [thisGameData, setThisGameData] = useState([])
    var cardSize = 200
    

    const styles = ({
        spacePlayerLabel: {
            width: 200,
            height: 25,
            marginBottom: 20,
            fontSize: 25
        },
        spaceLabel: {
            width: 200,
            height: 25,
            marginBottom: 20,
            fontSize: 15
        },
    })

    //fetch all players
    const fetchPlayers = async () => {
        const res = await Axios.get(`http://${ipAddress}:3003/player/findAll`)
        const data = await res.data
        setPlayerData(data)
        return data
    }

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

    const findPlayer = async () => {
        var notFound = false
        var count = 0
        while(notFound == false && count < playerData.length){
            //console.log(playerData[count].name)
            //console.log(userInputPlayerName)
            if(playerData[count].name == userInputPlayerName){
                //console.log(playerData[count])
                setThisPlayerData(playerData[count])
                //console.log(thisPlayerData)
                notFound = true
            }
            else {
                count=count+1
            }
        }
    }

    const findPlyerTurn = async (playerId) => {
        var notFound = false
        var count = 0
        while(notFound == false && count < playerData.length){
            if(playerData[count]._id == playerId){
                notFound = true
                return playerData[count].name
            }
            else {
                count=count+1
            }
        }
    }

    const findAction = async (playerId) => {
        var notFound = false
        var count = 0
        while(notFound == false && count < playerData.length){
            if(playerData[count]._id == playerId){
                notFound = true
                return playerData[count].action
            }
            else {
                count=count+1
            }
        }
    }

    const findCard = async (cardID) => {
        var notFound = false
        var count = 0

        //console.log(cardID)
        while(notFound == false && count < cardData.length){  
            //console.log(cardData[count]) 
            if(cardData[count]._id == cardID){
                console.log(cardData[count].img)
                notFound = true
                return cardData[count].img
            }
            else {
                count=count+1
            }
        }
    }

    const setImgs = async (hold1, hold2, hold3, hold4, hold5, hold6, hold7) => {
        setCardImg1(hold1)
        setCardImg2(hold2)
        setCardImg3(hold3)
        setCardImg4(hold4)
        setCardImg5(hold5)
        setCardImg6(hold6)
        setCardImg7(hold7)
    }

    const findGame = async (gameID) => {
        var notFound = false
        var count = 0
        while(notFound == false && count < gameData.length){
            //console.log(gameData[count])
            //console.log(gameID)
            if(gameID){
                if(gameData[count]._id == gameID){
                    console.log(gameData[count])
                    notFound = true
                    setThisGameData(gameData[count])
                }
                else {
                    count=count+1
                }
            }
            else {
                alert("Please wait a few seconds while data loads")
            }
            
        }
    }

    const turnRequest = async (value) => {
        try {
            const res = await Axios.put(`http://${ipAddress}:3003/game/changeTurn/${mongoGameID}`, {playerNum: value})
        } catch (err){
            console.log(err)
        }
    }

    const updateTurn = async () => {
        if(thisGameData.name){
            if(thisGameData.turnNum = thisGameData.playerCount){
               const holdUpdate = await turnRequest(0)
               return 1
            }
            else {
                const holdVal = thisGameData.turnNum + 1
                const holdUpdate = await turnRequest(holdVal)
                return 1 
            }
        }
        else {
            alert("Please refresh game")
            return 2
        }
    }

    const updateImages = async () => {
        const callFindAll =  await fetchPlayers()
        const callPlayer = await findPlayer()
        if(thisPlayerData.cards){
            const img1 = await findCard(thisPlayerData.cards[0])
            const img2 = await findCard(thisPlayerData.cards[1])
            const img3 = await findCard(thisPlayerData.cards[2])
            const img4 = await findCard(thisPlayerData.cards[3])
            const img5 = await findCard(thisPlayerData.cards[4])
            const img6 = await findCard(thisPlayerData.cards[5])
            const img7 = await findCard(thisPlayerData.cards[6])
            const holdImgs = await setImgs(img1, img2, img3, img4, img5, img6, img7)
        } else {
            alert("Please wait a few seconds while data loads")
        }
        
    }

    const updatedGame = async () => {
        const callFindAll =  await getGames()
        const callPlayer = await findGame(mongoGameID)
        console.log("thisGameData: ")
        console.log(thisGameData.turnNum)
        if(thisGameData.turnNum >= 0){
            const holdIndex = thisGameData.turnNum
            const holdPlayerName = await findPlyerTurn(thisGameData.players[holdIndex])
            const holdAction = await findAction(thisGameData.players[holdIndex])
            setCurrentTurn(holdPlayerName)
            setCurrentAction(holdAction)
            updateImages()
        }
        else {
            alert("Please wait a few seconds while data loads")
        }
    }

    const takeCard = async () => {
        
    }

    const cardClick = async() => {
        if(thisGameData.name){
            if(thisPlayerData.name){
                var holdNum = thisGameData.turnNum
                holdNum = holdNum + 1
                const wait = await updateTurn(holdNum)
                console.log("CardClick wait:")
                console.log(wait)
                console.log(thisGameData)
                console.log(gameData)
                /*if(wait == 1){
                    updatedGame()
                }
                else {
                    console.log("Problem with cardClick")
                }*/
            }
        }
    };

    if(!cardImg1){
        setCardImg1('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
        setCardImg2('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
        setCardImg3('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
        setCardImg4('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
        setCardImg5('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
        setCardImg6('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
        setCardImg7('https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png')
    }

    //if(thisGameData)

    return(
        <div>
            <div>
                <h1>
                    Current Turn: {currentTurn}
                </h1>
                <label style={styles.spacePlayerLabel}>
                    Player is currently: {currentAction}
                </label>
            </div>
            <div>
                <label style={styles.spaceLabel}>
                    Current Hand
                </label>
            </div>
            <div>
                <button><img src = {cardImg1} alt='Button 1' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
                <button><img src = {cardImg2} alt='Button 2' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
                <button><img src = {cardImg3} alt='Button 3' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
                <button><img src = {cardImg4} alt='Button 4' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
                <button><img src = {cardImg5} alt='Button 5' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
                <button><img src = {cardImg6} alt='Button 6' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
                <button><img src = {cardImg7} alt='Button 7' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
            </div>
            <div>
                <label style={styles.spaceLabel}>
                    Current Hand
                </label>
            </div>
            <div>
                <Button text = "Deal Cards" color = "white" onClick = {() => {
                    updateImages()
                }} />
            </div>
            <div>
                <Button text = "Refresh Game" color = "white" onClick = {() => {
                    updatedGame()
                }} />
            </div>
            <div>
                <Button text = "Exit Game" color = "white" onClick = {() => {
                    setCurrentPage("LandingPage")
                }} />
            </div>
        </div>  
    )
}

export default PlayGamePage