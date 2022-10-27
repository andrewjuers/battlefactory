import { CurrentPokemon } from "components/CurrentPokemon";
import { Move } from "components/Move";
import { PokemonParty } from "components/PokemonParty";
import './Battle.css';

export function Battle(props) {
    console.log(props.playerPokemon[0])

    let moves = props.playerPokemon[0].moveset.map((move, index) => {
        return (
            <div key={index}>
                <Move 
                    move={move}
                    onClick={doMove}
                />
            </div>
        )
    })

    function doMove(move) {
        console.log(move)
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
        </div>
    );
}