import { StatsDisplay } from "components/StatsDisplay";
import { pokemonNameToString, pokemonTypeToString } from "shared";
import "./HoverPokemonData.css";

export function HoverPokemonData(props) {
    const abilities = [];
    for (let i = 0; i < props.pokemon.abilities.length; i++) {
        abilities.push(props.pokemon.abilities[i].ability.name + " ");
    }

    return (
        <div className="hover-pokemon-div">
            <p>{pokemonNameToString(props.pokemon)}</p>
            <p>Type: {pokemonTypeToString(props.pokemon)}</p>
            {/* <p>Abilities: {abilities}</p>
            <p>Weight: {props.pokemon.weight}</p> */}
            <StatsDisplay pokemon={props.pokemon} />
        </div>
    );
}
