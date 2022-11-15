import { TRAINER_BLAKE } from "shared";
import "./BossDisplay.css";

export function BossDisplay(props) {
    let text =
        "You won " +
        props.winStreak +
        " battles in a row! Now you must battle Blake!";
    let img = TRAINER_BLAKE.img;

    return (
        <div className="boss-display-div">
            <h2>{text}</h2>
            <img src={img} alt="Blake"></img>
            <h1>{TRAINER_BLAKE.text}</h1>
            <button onClick={() => props.nextBattle()}>Fight!</button>
        </div>
    );
}
