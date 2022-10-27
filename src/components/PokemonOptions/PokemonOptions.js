import { PokemonOption } from "components";
import './PokemonOptions.css';

export function PokemonOptions(props) {

    const pokes = props.pokemon.map((poke, i) => {
        return (
            <div key={i}>
                <PokemonOption 
                    pokemon={poke}
                    onClick={props.onClick}
                />
            </div>
        );
    });

    return(
        <div className="pokemon-options">
            {pokes}
        </div>
    );
}