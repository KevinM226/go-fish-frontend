import { Link } from 'react-router-dom'

const Button = ({ text, color, onClick, link }) => {
    return (
    <Link to= {link}>
        <button 
            onClick={onClick}
            style = {{ backgroundColor: color }}
            className = "button"
        >
            {text}
        </button>
    </Link>

    )
}

Button.defaultProps = {
    color: 'gray',
    text: 'Button',
}



export default Button