import { CurrentPokemon } from "components/CurrentPokemon";
import { GameOverDisplay } from "components/GameOverDisplay";
import { Move } from "components/Move";
import { PokemonParty } from "components/PokemonParty";
import { TurnFeed } from "components/TurnFeed";
import { useEffect, useState } from "react";
import { doSwitch, doTurn, switchPokemon } from "shared";
import "./Battle.css";

export function Battle(props) {
    const [turns, setTurns] = useState([]);
    const [isForceSwitch, setForceSwitch] = useState(false);
    const [isGameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (isForceSwitch === false) return;
        if (props.opponentPokemon[0].hp[0] === 0) {
            let switch_index = switchPokemon(props.opponentPokemon);
            if (switch_index === -1) {
                alert("You win!");
                setGameOver(true);
                return;
            }
            updateTurnText(
                doSwitch(
                    props.opponentPokemon,
                    switchPokemon(props.opponentPokemon)
                )
            );
            setForceSwitch(false);
        }
        if (props.playerPokemon[0].hp[0] === 0) {
            let playing = false;
            for (const poke of props.playerPokemon) {
                if (poke.hp[0] > 0) playing = true;
            }
            if (!playing) {
                alert("You lose!");
                setGameOver(true);
            }
        }
    }, [isForceSwitch]);

    function nextTurn(move) {
        if (isGameOver) {
            alert("Game is over.");
            return;
        }
        else if (isForceSwitch) {
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
        if (
            props.playerPokemon[0].hp[0] === 0 ||
            props.opponentPokemon[0].hp[0] === 0
        )
            setForceSwitch(true);
    }

    function onSwitch(index) {
        if (isGameOver) {
            alert("Game is over.");
            return;
        }
        if (isForceSwitch) {
            updateTurnText(doSwitch(props.playerPokemon, index));
            setForceSwitch(false);
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

    let moves = props.playerPokemon[0].moveset.map((move, index) => {
        return (
            <div key={index}>
                <Move move={move} onClick={nextTurn} />
            </div>
        );
    });

    return (
        <div className="battle">
            <div className="pokemon-grid">
                <div></div>
                <div className="opponent">
                    <PokemonParty pokemon={props.opponentPokemon} />
                    <CurrentPokemon
                        pokemon={props.opponentPokemon[0]}
                        img={props.opponentPokemon[0].sprites.front_default}
                    />
                </div>
                <div className="player">
                    <CurrentPokemon
                        pokemon={props.playerPokemon[0]}
                        img={props.playerPokemon[0].sprites.back_default}
                    />
                    <div className="pokemon-moves">{moves}</div>
                    <PokemonParty
                        pokemon={props.playerPokemon}
                        onClick={onSwitch}
                    />
                </div>
                <div></div>
            </div>
            <div className="turn-feed">
                <TurnFeed turns={turns} />
            </div>
            {(isGameOver && 
                <div className="game-over">
                    <GameOverDisplay 
                        win={true}
                    />
                </div>    
            )}
        </div>
    );
}
