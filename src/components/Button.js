
const Button = ({ text, color, onClick }) => {
    return (
        <button 
            onClick={onClick}
            style = {{ backgroundColor: color }}
            className = "button"
        >
            {text}
        </button>

    )
}

Button.defaultProps = {
    color: 'gray',
    text: 'Button',
}



export default Button