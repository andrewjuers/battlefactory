import { pokemonNameToString, pokemonTypeToString } from "shared";
import "./HoverPokemonData.css";

export function HoverPokemonData(props) {
    const stat_names = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];
    const stats = stat_names.map((stat, index) => {
        return stat + ": " + props.pokemon.base_stats[index] + " ";
    });
    const abilities = [];
    for (let i = 0; i < props.pokemon.abilities.length; i++) {
        abilities.push(props.pokemon.abilities[i].ability.name + " ");
    }

    return (
        <div className="hover-pokemon-div">
            <p>{pokemonNameToString(props.pokemon)}</p>
            <p>Type: {pokemonTypeToString(props.pokemon)}</p>
            <p>Abilities: {abilities}</p>
            <p>Weight: {props.pokemon.weight}</p>
            <p>Stats: {stats}</p>
        </div>
    );
}
