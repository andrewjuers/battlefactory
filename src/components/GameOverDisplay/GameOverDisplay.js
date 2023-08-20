import './GameOverDisplay.css';
import React from 'react';

export function GameOverDisplay(props) {

    const [message, button_text] = props.win ? ["You Win!", "swap"] : ["You Lose! Game Over! :P", "home"];

    return (
        <div className="game-over-div">
            <h3>Win Streak: {props.winStreak}</h3>
            <h3>{message}</h3>
            <button className='game-over-button' onClick={() => props.onClick(button_text)}>{button_text}</button>
        </div>
    );
}