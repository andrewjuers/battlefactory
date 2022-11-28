import { useTypedMessage } from "hooks";

export function BattleAnnouncer(props) {
    let message = "";
    if (props.text !== undefined) {
        for (let i = 0; i < props.text.length; i++) {
            if (i > 0) message = message + " ";
            message = message + props.text[i];
        }
    }
    let typedMessage = useTypedMessage(message);

    return (
        <div>
            <div>{typedMessage}</div>
        </div>
    );
}
