import './TurnDetails.css';

export function TurnDetails(props) {

    const typedMessages = props.details.map((d, i) => {
        return (
            <p key={i}>{d}</p>
        )
    })

    return (
        <div className="turn-div">
            <h2 className="turn-heading"> <button onClick={() => props.setStepNumber(props.turn)}>Turn {props.turn} </button></h2>
            <div className="typed-messages">
                {typedMessages}
            </div>
        </div>
    )
}