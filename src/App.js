import './App.css';
import LandingPage from "./components/LandingPage";
import HostCreatePage from "./components/CreateGamePage";
import PlayGamePage from "./components/PlayGamePage";
import FindGamePage from "./components/FindGamePage";
import React, { useState, useEffect } from 'react';
import Axios from "axios";

//main app 
const App = () => {
  //state constants, and their set functions for games, players, and cardss
  const [gameData, setGameData] = useState([])
  const [cardData, setCardData] = useState([])
  const [playerData, setPlayerData] = useState([])
  const [mongoGameID, setMongoGameID] = useState("")
  const [userInputPlayerName, setUserInputPlayerName] = useState("")
  const [mongoPlayerID, setMongoPlayerID] = useState("")
  const [mapGames, setMapGames] = useState([])

  //state of the current page, used to render specific pages
  const [currentPage, setCurrentPage] = useState("")

  //fetch all the Games
  const fetchGames = async () => {
    const res = await Axios.get("http://localhost:3003/game/findAll")
    const data = await res.data
    return data
  }

  //fetch all cards
  const fetchCards = async () => {
    const res = await Axios.get("http://localhost:3003/card/findAll")
    const data = await res.data
    return data
  }

   //fetch all players
   const fetchPlayers = async () => {
    const res = await Axios.get("http://localhost:3003/player/findAll")
    const data = await res.data
    return data
  }


  const conditionalRender = () => {
    if (currentPage == "CreateGamePage") {
      return(<HostCreatePage 
        gameData = {gameData}
        setGameData = {setGameData}
        setCurrentPage = {setCurrentPage}
        userInputPlayerName = {userInputPlayerName}
        setMongoPlayerID = {setMongoPlayerID} 
        setMongoGameID = {setMongoGameID}
      />)
    }
    if (currentPage == "PlayGamePage") {
      return(<PlayGamePage 
        setCurrentPage = {setCurrentPage}
        setGameData = {setGameData}
        mongoPlayerID={mongoPlayerID}
        mongoGameID={mongoGameID}
        userInputPlayerName = {userInputPlayerName}
        setPlayerData = {setPlayerData}
        gameData = {gameData}
        playerData = {playerData}
        cardData = {cardData}
      />)
    }
    if (currentPage == "FindGamePage") {
      return(<FindGamePage 
        gameData = {gameData}
        setCurrentPage = {setCurrentPage}
        setGameData = {setGameData}
        mongoPlayerID={mongoPlayerID}
        setMongoPlayerID = {setMongoPlayerID}
        userInputPlayerName = {userInputPlayerName}
        setMongoGameID = {setMongoGameID}
      />)
    }
    //Base State is landing page
    return(<LandingPage 
      gameData = {gameData}
      playerData={playerData}  
      setUserInputPlayerName = {setUserInputPlayerName}
      setCurrentPage = {setCurrentPage}
    />)
  }

  
  //an array that gets all the current games from the backend
  const makeGameArr = () => {
    var mapArray = [{}]

    var IDArr = []
    var gameArr = []

    const getGames = async (IDArr, gameArr) => {

        var mapCount = 0

        var gameCount, IDCount

        for (gameCount = 0; gameCount < gameArr.length; gameCount++) {
            for (IDCount = 0; IDCount < IDArr.length; IDCount++) {
                if (gameArr[gameCount]._id === IDArr[IDCount]) {
                   mapArray[mapCount] = gameArr[gameCount]
                   mapCount++
                }
                
            }
        }
        setMapGames(mapArray)
    }

    const getGameIDs = async ( id ) => {
      try {
        console.log("Game Id to get name for", id)
        const res = await Axios.get(`http://localhost:3003/game/findOne/${id}`)
        IDArr = res.data
        gameArr = res.data
      } catch (err) {
        console.log(err)
      }

    }

    const findGameArr = async () => {
      try{
        const res = await Axios.get("http://localhost:3003/game/findAll")
        gameArr = res.data
        console.log("This is gameArr")
        console.log(gameArr)
        getGames();
      } catch (err) {
        console.log(err)
      }
    }

    findGameArr(getGameIDs)
  }

  //use effect (same as ComponentDidMount), runs when component renders
  useEffect(() => {
    //calls the fetch rooms and changes state of roomData
    const getGames = async() => {
      const gamesFromBackend = await fetchGames()
      setGameData(gamesFromBackend)
    }
    //calls the fetch cards and changes state of cardData
    const getCards = async() => {
      const cardsFromBackend = await fetchCards()
      setCardData(cardsFromBackend)
    }
    //calls the fetch players and changes state of playerData
    const getPlayers = async() => {
      const playersFromBackend = await fetchPlayers()
      setPlayerData(playersFromBackend)
    }
    
    //get all the data when first launched
    if (!cardData.length) {
      getCards()
    }
    if (!gameData.length){
      getGames()
    }
    if(!playerData.length){
      getPlayers()
    }

  }, [])

  //Switch statement in return controlls what component renders
  return (
    <div className="App">
      {conditionalRender()}
    </div>
  );
}

export default App;