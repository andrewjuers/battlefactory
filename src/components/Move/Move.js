import { useState } from "react";
import "./Move.css";

export function Move(props) {
    const [style, setStyle] = useState({ display: "none" });

    if (props.move.type === undefined) {
        return <div></div>;
    }

    return (
        <div>
            <div className="move-div">
                <button
                    className="move-button"
                    id={props.move.type.name}
                    onClick={() => props.onClick(props.move)}
                    onMouseOver={(e) => {
                        setStyle({ display: "table" });
                    }}
                    onMouseOut={(e) => {
                        setStyle({ display: "none" });
                    }}
                >
                    <p>{props.move.name}</p>
                    <p>{props.move.type.name}</p>
                </button>
            </div>
            <div style={style}>
                <div className="move-info-div">
                    <p>Power: {props.move.power}</p>
                    <p>Damage Class: {props.move.damage_class.name}</p>
                    <p>Priority: {props.move.priority}</p>
                    <p>Accuracy: {props.move.accuracy}</p>
                    <p>PP: {props.move.pp}</p>
                    <p>
                        Effect:{" "}
                        {props.move.effect_entries[0] !== undefined
                            ? props.move.effect_entries[0].effect
                            : "ERROR!"}
                    </p>
                    <p>
                        Description:{" "}
                        {props.move.flavor_text_entries[1].flavor_text}
                    </p>
                </div>
            </div>
        </div>
    );
}
