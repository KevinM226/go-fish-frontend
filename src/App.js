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
  const [gameIDData, setGameIDData] = useState("")
  const [userInputName, setUserInputName] = useState("")
  const [mongoGameID, setMongoGameID] = useState("")
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


  const conditionalRender = () => {
    if (currentPage == "CreateGamePage") {
      return(<HostCreatePage 
        gameData = {gameData}
        makeGameArr={makeGameArr}
        setCurrentPage = {setCurrentPage}
        addButton = {addButton}
        />)
    }
    if (currentPage == "PlayGamePage") {
      return(<PlayGamePage 
        setCurrentPage = {setCurrentPage}
        />)
    }
    if (currentPage == "FindGamePage") {
      return(<FindGamePage 
        gameData = {gameData}
        setCurrentPage = {setCurrentPage}
      />)
    }
    //Base State is landing page
    return(<LandingPage 
      gameData = {gameData} 
      gameIDData = {gameIDData} 
      setCurrentPage = {setCurrentPage}
      findGame={findGame}
      />)
  }

  //OnClick for create game button
  const addButton = async(gameTitle) => {
    console.log('click ' + gameTitle)
    setUserInputName(gameTitle)
  }

  //OnClick for create game button
  const findGame = async() => {
    console.log("Click")
  }

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
        mongoGameID = res.data._id
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
    //calls the fetch movies and changes state of movieData
    const getCards = async() => {
      const cardsFromBackend = await fetchCards()
      setCardData(cardsFromBackend)
    }
    
    //if cards has data in it, don't run the fetch again
    if (!cardData.length) {
      getCards()
    }
    
    //get all the games from mongoDB
    getGames()

  }, [])

  //Switch statement in return controlls what component renders
  return (
    <div className="App">
      {conditionalRender()}
    </div>
  );
}

export default App;