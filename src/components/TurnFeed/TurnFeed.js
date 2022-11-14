import { TurnDetails } from 'components/TurnDetails';
import ScrollableFeed from 'react-scrollable-feed';
import './TurnFeed.css';

export function TurnFeed(props) {

    const turns = props.turns.map((t, i) => {
        return (
            <TurnDetails
                key={i}
                turn={i+1}
                details={t}
                setStepNumber={props.setStepNumber}
            />
        )
    });

    return(
        <div className="turn-feed-div">
            <ScrollableFeed forceScroll={true}>
                {turns}
            </ScrollableFeed>
        </div>
    );
}