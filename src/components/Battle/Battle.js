import { CurrentPokemon } from "components/CurrentPokemon";
import { Move } from "components/Move";
import { PokemonParty } from "components/PokemonParty";
import { TurnFeed } from "components/TurnFeed";
import { useState } from "react";
import { doTurn } from "shared";
import './Battle.css';

export function Battle(props) {

    const [turns, setTurns] = useState([]);

    let moves = props.playerPokemon[0].moveset.map((move, index) => {
        return (
            <div key={index}>
                <Move 
                    move={move}
                    onClick={nextTurn}
                />
            </div>
        )
    })

    // function doMove(move) {
    //     let damage = damageCalc(props.playerPokemon[0], props.opponentPokemon[0], move);
    //     let pokemon = [...props.opponentPokemon];
    //     pokemon[0].hp[0] = pokemon[0].hp[0] - damage < 0 ? 0 : pokemon[0].hp[0] - damage;
    //     props.updateOpponentPokemon(pokemon);
    //     let message = props.playerPokemon[0].name + " used " + move.name + "!";
    //     setTurns(message);
    //     let t = [...turns];
    //     t.push(message);
    //     setTurns(t);
    // }

    function nextTurn(move) {
        let text = doTurn(props.playerPokemon, props.opponentPokemon, move);
        let texts = "";
        for (const t of text) {
            texts = texts + t;
        }
        let t = [...turns];
        t.push(text);
        setTurns(t);
    }

    return (
        <div className="battle">
            <div className="pokemon-grid">
                <div></div>
                <div className="opponent">
                    <PokemonParty 
                        pokemon={props.opponentPokemon}
                    />
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
                    <div className="pokemon-moves">
                        {moves}
                    </div>
                    <PokemonParty
                        pokemon={props.playerPokemon}
                    />
                </div>
                <div></div>
            </div>
            <div className="turn-feed">
                <TurnFeed
                    turns={turns}
                />
            </div>
        </div>
    );
}