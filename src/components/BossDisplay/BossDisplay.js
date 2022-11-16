import { TRAINER_ALAZAR, TRAINER_BLAKE } from "shared";
import "./BossDisplay.css";

export function BossDisplay(props) {

    let trainer = props.winStreak === 6 ? TRAINER_BLAKE : TRAINER_ALAZAR;

    let text =
        "You won " +
        props.winStreak +
        " battles in a row! Now you must battle Trainer " + trainer.name + "!";
    let img = trainer.img;

    let trainer_text = trainer.text.map((t, i) => {
        return <h1 key={i}>{t}</h1>;
    });

    return (
        <div className="boss-display-div">
            <h3>{text}</h3>
            <img src={img} alt={trainer.name}></img>
            <h2>{trainer_text}</h2>
            <button onClick={() => props.nextBattle()}>Fight!</button>
        </div>
    );
}
