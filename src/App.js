import './App.css';
import LandingPage from "./components/LandingPage";
import HostCreatePage from "./components/CreateGamePage";
import PlayGamePage from "./components/PlayGamePage";
import FindGamePage from "./components/FindGamePage";
import React, { useState, useEffect } from 'react';
import Axios from "axios";

//Generate A Game ID to be used 
const GenGameID = () => {
  return Math.random().toString(36).slice(2,6).toUpperCase();
}

//main app 
const App = () => {
  //state constants, and their set functions for games, players, and cardss
  const [gameData, setGameData] = useState([])
  const [cardData, setCardData] = useState([])
  const [gameIDData, setGameIDData] = useState("")
  const [mongoGameID, setMongoGameID] = useState("")

  //state of the current page, used to render specific pages
  const [currentPage, setCurrentPage] = useState("")

  //fetch all the Games
  const fetchGames = async () => {
    const res = await Axios.get("http://localhost:3000/game/findAll")
    const data = await res.data
    return data
  }

  //fetch all cards
  const fetchCards = async () => {
    const res = await Axios.get("http://localhost:3000/card/findAll")
    const data = await res.data
    return data
  }


  const conditionalRender = () => {
    if (currentPage == "CreateGamePage") {
      return(<HostCreatePage 
        gameData = {gameData}
        createGame={makeGame}
        setCurrentPage = {setCurrentPage}
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
  const makeGame = async() => {
    const gameID = GenGameID()
    const res = await Axios.post("http://localhost:3000/game/create", { name: gameID });

    setMongoGameID(res.data._id)
    setGameIDData(res.data.name)
  }

  //OnClick for create game button
  const findGame = async() => {
    console.log("Click")
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