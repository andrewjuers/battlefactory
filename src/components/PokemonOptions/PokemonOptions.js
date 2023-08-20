import { PokemonOption } from "components";
import React from "react";
import './PokemonOptions.css';

export function PokemonOptions(props) {

    const pokes = props.pokemon.map((poke, i) => {
        return (
            <div key={i}>
                <PokemonOption 
                    pokemon={poke}
                    onClick={props.onClick}
                    selectedPokemon={props.selectedPokemon}
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