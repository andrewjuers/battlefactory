import { useTypedMessage } from 'hooks';
import './TurnDetails.css';

export function TurnDetails(props) {

    //const typedMessage = useTypedMessage(props.details)
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