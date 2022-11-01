import './TurnDetails.css';

export function TurnDetails(props) {

    const typedMessages = props.details.map((d, i) => {
        return (
            <p key={i}>{d}</p>
        )
    })

    return (
        <div className="turn-div">
            <h1>Turn {props.turn}</h1>
            {typedMessages}
        </div>
    )
}