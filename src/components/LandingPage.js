//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import logo from "../Images/logo.png"
import Button from "./Button"

//Landing page component
export const LandingPage = ({ findGame, setCurrentPage }) => {

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
                <Button text = "Create a Game" color = "green" onClick = {() => {
                    setCurrentPage("CreateGamePage")
                }} />
            </div>
            <div>
                <Button text = "Find Game" color = "blue" onClick = {() => {
                    findGame()
                    setCurrentPage("FindGamePage")
                }} />
            </div>
        </div>
    )
}

export default LandingPage