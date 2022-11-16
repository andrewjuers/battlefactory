import { wait } from "@testing-library/user-event/dist/utils";
import { CurrentPokemon } from "components";
import { GameOverDisplay } from "components";
import { Move } from "components";
import { PokemonParty } from "components";
import { TurnFeed } from "components";
import { BattleAnnouncer } from "components";
import { useEffect, useState } from "react";
import { doSwitch, doTurn, switchPokemon, lodash, arraysEqual } from "shared";
import "./Battle.css";

export function Battle(props) {
    const [turns, setTurns] = useState([]);
    const [isForceSwitch, setForceSwitch] = useState(false);
    const [isGameOver, setGameOver] = useState(false);
    const [isVictory, setVictory] = useState(null);
    const [history, setHistory] = useState([
        {
            playerPokemon: lodash.cloneDeep(props.playerPokemon),
            opponentPokemon: lodash.cloneDeep(props.opponentPokemon),
        },
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [announcerMessage, setAnnouncerMessage] = useState([]);
    const [isAnimating, setAnimating] = useState(false);

    useEffect(() => {
        if (isForceSwitch === false) return;
        if (props.opponentPokemon[0].hp[0] <= 0) {
            let switch_index = switchPokemon(
                props.playerPokemon,
                props.opponentPokemon
            );
            if (switch_index === -1) {
                setGameOver(true);
                updateHistory();
                return;
            }
            updateTurnText(doSwitch(props.opponentPokemon, switch_index));
            setForceSwitch(false);
            updateHistory();
        }
        if (props.playerPokemon[0].hp[0] === 0) {
            let playing = false;
            for (const poke of props.playerPokemon) {
                if (poke.hp[0] > 0) playing = true;
            }
            if (!playing) {
                setGameOver(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isForceSwitch]);

    useEffect(() => {
        if (!isGameOver || isVictory !== null) return;
        let [message, win] =
            props.playerPokemon[0].hp[0] === 0
                ? ["You Lose!", false]
                : ["You Win!", true];
        updateTurnText(message);
        updateTurnText("Player2(CPU): GGWP!");
        setVictory(win);
        if (win) props.setWinStreak(props.winStreak + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameOver]);

    useEffect(() => {
        (async () => {
            setAnimating(true);
            await wait(500);
            setAnimating(false);
        })();
    }, [announcerMessage]);

    function nextTurn(move) {
        if (isAnimating) return;
        if (stepNumber < history.length - 1) {
            alert("You are living in the past... Let's try that again...");
            setStepNumber(history.length - 1);
            return;
        }
        if (isGameOver) {
            alert("Game is over.");
            return;
        } else if (isForceSwitch) {
            alert("Pick a pokemon to switch into!");
            return;
        }
        let text = doTurn(props.playerPokemon, props.opponentPokemon, move);
        let texts = "";
        for (const t of text) {
            texts = texts + t;
        }
        let t = [...turns];
        t.push(text);
        setTurns(t);
        if (arraysEqual(text, announcerMessage)) text.push(" (again lol)");
        setAnnouncerMessage(text);
        if (
            props.playerPokemon[0].hp[0] === 0 ||
            props.opponentPokemon[0].hp[0] === 0
        )
            setForceSwitch(true);
        else {
            updateHistory();
        }
    }

    function onSwitch(index) {
        if (isGameOver) {
            alert("Game is over.");
            return;
        }
        if (isForceSwitch) {
            let text = doSwitch(props.playerPokemon, index);
            updateTurnText(text);
            setForceSwitch(false);
            updateHistory();
            setAnnouncerMessage([text]);
        } else if (!isForceSwitch) {
            let move = { priority: 6, index: index };
            nextTurn(move);
        }
    }

    function updateTurnText(text) {
        let t = [...turns];
        t[t.length - 1].push(text);
        setTurns(t);
    }

    function updateHistory() {
        history.push({
            playerPokemon: lodash.cloneDeep(props.playerPokemon),
            opponentPokemon: lodash.cloneDeep(props.opponentPokemon),
        });
        setStepNumber(history.length - 1);
        setHistory(history);
    }

    let displaypokes =
        stepNumber >= history.length - 1
            ? props.playerPokemon
            : history[stepNumber].playerPokemon;
    let currentpoke =
        stepNumber >= history.length - 1
            ? props.playerPokemon[0]
            : history[stepNumber].playerPokemon[0];
    let moves = currentpoke.moveset.map((move, index) => {
        return (
            <div key={index}>
                <Move
                    move={move}
                    onClick={nextTurn}
                    attackerDefender={
                        stepNumber >= history.length - 1
                            ? [props.playerPokemon[0], props.opponentPokemon[0]]
                            : [
                                  history[stepNumber].playerPokemon[0],
                                  history[stepNumber].opponentPokemon[0],
                              ]
                    }
                    moveOwner="current"
                />
            </div>
        );
    });
    let partyMoves = [];
    for (let i = 0; i < 2; i++) {
        partyMoves[i] = displaypokes[i + 1].moveset.map((move, index) => {
            return (
                <div key={index}>
                    <Move
                        move={move}
                        onClick={() => {}}
                        attackerDefender={
                            stepNumber >= history.length - 1
                                ? [
                                      props.playerPokemon[i + 1],
                                      props.opponentPokemon[0],
                                  ]
                                : [
                                      history[stepNumber].playerPokemon[i + 1],
                                      history[stepNumber].opponentPokemon[0],
                                  ]
                        }
                        moveOwner="party"
                    />
                </div>
            );
        });
    }
    return (
        <div className="battle">
            <div className="pokemon-grid">
                <div>
                    {isGameOver && (
                        <div className="game-over">
                            <GameOverDisplay
                                win={isVictory}
                                onClick={props.setBattleFactoryState}
                                winStreak={props.winStreak}
                            />
                        </div>
                    )}
                    {!isGameOver && (
                        <div>
                            <h2>Turn {stepNumber + 1}</h2>
                        </div>
                    )}
                </div>
                <div className="opponent">
                    <PokemonParty
                        pokemon={
                            stepNumber >= history.length - 1
                                ? props.opponentPokemon
                                : history[stepNumber].opponentPokemon
                        }
                    />
                    <CurrentPokemon
                        pokemon={
                            stepNumber >= history.length - 1
                                ? props.opponentPokemon[0]
                                : history[stepNumber].opponentPokemon[0]
                        }
                        img={
                            stepNumber >= history.length - 1
                                ? props.opponentPokemon[0].sprites.front_default
                                : history[stepNumber].opponentPokemon[0].sprites
                                      .front_default
                        }
                    />
                </div>
                <div className="player">
                    <CurrentPokemon
                        pokemon={
                            stepNumber >= history.length - 1
                                ? props.playerPokemon[0]
                                : history[stepNumber].playerPokemon[0]
                        }
                        img={
                            stepNumber >= history.length - 1
                                ? props.playerPokemon[0].sprites.back_default
                                : history[stepNumber].playerPokemon[0].sprites
                                      .back_default
                        }
                    />
                    <div className="pokemon-moves">{moves}</div>
                    <PokemonParty
                        pokemon={
                            stepNumber >= history.length - 1
                                ? props.playerPokemon
                                : history[stepNumber].playerPokemon
                        }
                        onClick={onSwitch}
                    />
                    <div className="party-moves">
                        {partyMoves[0]}&nbsp;&nbsp;&nbsp;{partyMoves[1]}
                    </div>
                </div>
                <div className="battle-announcer-parent">
                    <div className="battle-announcer-child">
                        {turns.length > 0 && (
                            <div>
                                <BattleAnnouncer
                                    text={
                                        stepNumber >= history.length - 1
                                            ? announcerMessage
                                            : (stepNumber === 0 ? [""] : turns[stepNumber-1])
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="turn-feed">
                <TurnFeed turns={turns} setStepNumber={setStepNumber} />
                <div className="turn-control-buttons">
                    <button
                        onClick={() => {
                            setStepNumber(0);
                        }}
                    >
                        |&lt;&lt;
                    </button>
                    <button
                        onClick={() => {
                            if (stepNumber > 0) setStepNumber(stepNumber - 1);
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => {
                            if (stepNumber < history.length - 1)
                                setStepNumber(stepNumber + 1);
                        }}
                    >
                        &gt;
                    </button>
                    <button
                        onClick={() => {
                            if (stepNumber < history.length - 1)
                                setStepNumber(history.length);
                        }}
                    >
                        &gt;&gt;|
                    </button>
                </div>
            </div>
        </div>
    );
}
