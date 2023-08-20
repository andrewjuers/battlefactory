import './PokemonOption.css'
import React from 'react';

export function PokemonOption(props) {

    return(
        <div className={props.selectedPokemon === props.pokemon ? "selected-swap" : "not-selected"}>
            <button onClick={()=>props.onClick(props.pokemon)}><img src={props.pokemon.sprites.front_default} alt={props.pokemon.name}></img></button>
        </div>
    );
}