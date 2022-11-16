import { TRAINER_BLAKE } from "shared";
import "./BossDisplay.css";

export function BossDisplay(props) {
    let text =
        "You won " +
        props.winStreak +
        " battles in a row! Now you must battle Trainer Blake!";
    let img = TRAINER_BLAKE.img;

    let trainer_text = TRAINER_BLAKE.text.map((t, i) => {
        return <h1 key={i}>{t}</h1>;
    });

    return (
        <div className="boss-display-div">
            <h3>{text}</h3>
            <img src={img} alt="Blake"></img>
            <h2>{trainer_text}</h2>
            <button onClick={() => props.nextBattle()}>Fight!</button>
        </div>
    );
}
