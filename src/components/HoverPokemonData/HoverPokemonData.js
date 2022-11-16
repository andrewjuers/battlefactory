import { HealthBar } from "components/HealthBar";
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
            <div className="hover-pokemon-div-top">
                <p>{pokemonNameToString(props.pokemon)} &nbsp; hp: {props.pokemon.hp[0]}/{props.pokemon.hp[1]}</p>
                <HealthBar
                    label=""
                    value={props.pokemon.hp[0]}
                    maxValue={props.pokemon.hp[1]}
                />
            </div>
            <p>Type: {pokemonTypeToString(props.pokemon)}</p>
            {/* <p>Abilities: {abilities}</p>
            <p>Weight: {props.pokemon.weight}</p> */}
            <StatsDisplay pokemon={props.pokemon} />
        </div>
    );
}
