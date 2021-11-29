//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"

//Landing page component
export const PlayGamePage = ({ setCurrentPage, mongoGameID, gameData, playerData, setPlayerData, setGameData, cardData, mongoPlayerID }) => {
    const [currentTurn, setCurrentTurn] = useState("")
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

    const fillHand = async() => {
        for(let i = 0; i < 6; i++){
            try{
                const holdCard = generateCards()
                const updatedPlayer = await Axios.put(`http://192.168.1.138:3003/player/addCard/${mongoGameID}`, { card: holdCard._id })
            } catch (err) {
                console.error(err)
            }
        }
    }

    const fetchPlayer = async () => {
        const res = await Axios.get(`http://192.168.1.138:3003/player/findOne/${mongoPlayerID}`)
        const data = await res.data
        setPlayerData(data)
    }

    const updateTurn = async ( gName, pName ) => {
        try {
            const updatedGame = await Axios.put(`http://192.168.1.138:3003/game/changeTurn/${mongoGameID}`, { playerName: "holdPlayerIDs" })
        } catch (err) {
            console.error(err)
        }
    }

    const cardClick = () => {
        console.log("CLICKED");
    };

    fetchPlayer()
    //console.log(playerData.cards)
    
    
    return(
        <div>
            <div>
                <h1>
                    Current Turn: {currentTurn}
                </h1>
                <label style={styles.spacePlayerLabel}>
                    Player is currently: Deciding
                </label>
            </div>
            <div>
                <label style={styles.spaceLabel}>
                    Current Hand
                </label>
            </div>
            <div>
                <button><img src = {cardData[0].img} alt='Button 1' onClick={cardClick} height={cardSize} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.pngfind.com/pngs/m/39-397218_blank-playing-card-png-png-ramme-transparent-png.png"}}/></button>
            </div>
            <div>
                <Button text = "Back To Menu" color = "white" onClick = {() => {
                    setCurrentPage("LandingPage")
                }} />
            </div>
        </div>  
    )
}

export default PlayGamePage