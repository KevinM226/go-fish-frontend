
const Button = ({ text, color, onClick }) => {
    return (
        <button 
            onClick={onClick}
            style = {{ backgroundColor: color, marginBottom: 15, width: 200, height: 25 }}
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