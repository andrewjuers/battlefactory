import './GameOverDisplay.css';

export function GameOverDisplay(props) {

    const [message, button_text] = props.win ? ["You win!", "Next"] : ["You lose!", "Home"];

    return (
        <div className="game-over-div">
            <h2>{message}</h2>
            <button onClick={() => props.onClick()}>{button_text}</button>
        </div>
    );
}