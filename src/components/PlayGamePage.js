//import the logo for the game and the button component to enable use of the logo and
//button on the landing page
import Button from "./Button"

//Landing page component
export const PlayGamePage = ({ setCurrentPage }) => {

    return(
        <form>
            <div>
                <h1>
                    Current Turn: Player 1
                </h1>
                <label>
                    Player is currently: Deciding
                </label>
            </div>
        </form>  
    )
}

export default PlayGamePage