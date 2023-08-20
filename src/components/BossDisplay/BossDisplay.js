import { TRAINER_ALAZAR, TRAINER_BLAKE } from "shared";
import React from "react";
import "./BossDisplay.css";

export function BossDisplay(props) {

    let trainer = props.winStreak === 9 ? TRAINER_BLAKE : TRAINER_ALAZAR;

    let text =
        "You won " +
        props.winStreak +
        " battles in a row! Now you must battle Trainer " + trainer.name + "!";
    let img = trainer.img;

    let trainer_text = trainer.text.map((t, i) => {
        return <h2 key={i}>{t}</h2>;
    });

    return (
        <div className="boss-display-div">
            <h3>{text}</h3>
            <img src={img} alt={trainer.name}></img>
            {trainer_text}
            <button onClick={() => props.nextBattle()}>Fight!</button>
        </div>
    );
}
