//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import logo from "../Images/logo.png"
import Button from "./Button"
import Axios from "axios"
import { useState, useEffect } from 'react';

//Landing page component
export const LandingPage = ({ playerData, setCurrentPage, setUserInputPlayerName }) => {
    //used to store the player's input name
    const [playerName, setPlayerName] = useState("")

    //used to make UI elements look nice
    const styles = ({
        spaceInput: {
          width: 200,
          height: 25,
          margin: 15
        }
    })

    //Added a basic map function at the bottom of this return
    //this can be taken out, but it is good for testing at the moment
    return(
        <div>
            <div className = "logo">
                <img className = "image" src={logo} alt="Go Fish Logo"/>   
            </div>
            <h1>
                Welcome to Go Fish!
            </h1>
            <div>
                <input type = 'text' required 
                placeholder = 'Enter Player Name' value = { playerName } onChange = {(e) => setPlayerName(e.target.value)} style={styles.spaceInput}/>
            </div>
            <div>
                <Button text = "Create a Game" color = "white" onClick = {() => {
                    var checkedForName = false
                    var nameFound = false

                    var count = 0
                    while(checkedForName == false && count < playerData.length){
                        if(playerName.toLocaleLowerCase() === playerData[count].name.toLocaleLowerCase()){
                            nameFound = true
                            checkedForName = true
                        }
                        count++
                    }
                    if(nameFound == false ) {
                        setUserInputPlayerName(playerName)
                       setCurrentPage("CreateGamePage") 
                    } else {
                        alert('Player with this name already exists.');
                    }
                }} />
            </div>
            <div>
                <Button text = "Find Game" color = "white" onClick = {() => {
                     var checkedForName = false
                     var nameFound = false
 
                     var count = 0
                     while(checkedForName == false && count < playerData.length){
                         if(playerName.toLocaleLowerCase() === playerData[count].name.toLocaleLowerCase()){
                             nameFound = true
                             checkedForName = true
                         }
                         count++
                     }
                     if(nameFound == false) {
                        setUserInputPlayerName(playerName)
                        setCurrentPage("FindGamePage") 
                     } else {
                         alert('Player with this name already exists.');
                     }
                }} />
            </div>
        </div>
    )
}

export default LandingPage