import { TurnDetails } from 'components/TurnDetails';
import './TurnFeed.css';

export function TurnFeed(props) {

    const turns = props.turns.map((t, i) => {
        return (
            <TurnDetails
                key={i}
                turn={i+1}
                details={t}
            />
        )
    })

    return(
        <div>
            {turns}
        </div>
    )
}