import './TurnDetails.css';

export function TurnDetails(props) {

    const typedMessages = props.details.map((d, i) => {
        return (
            <p className="turn-text-line" key={i}>{d}</p>
        )
    })

    return (
        <div className="turn-div">
            <button className="turn-button" onClick={() => props.setStepNumber(props.turn)}><h2 className="turn-heading">Turn {props.turn}</h2></button>
            <div className="typed-messages">
                {typedMessages}
            </div>
        </div>
    )
}