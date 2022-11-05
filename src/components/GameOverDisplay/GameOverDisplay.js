import './GameOverDisplay.css';

export function GameOverDisplay(props) {

    const [message, button_text] = props.win ? ["You win!", "swap"] : ["You lose!", "home"];

    return (
        <div className="game-over-div">
            <h2>{message}</h2>
            <button className='game-over-button' onClick={() => props.onClick(button_text)}>{button_text}</button>
        </div>
    );
}