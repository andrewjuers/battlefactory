import { PokemonPartyMember } from "components/PokemonPartyMember";
import './PokemonParty.css';
import React from "react";

export function PokemonParty(props) {


    return(
        <div className="pokemon-party">
            <PokemonPartyMember pokemon={props.pokemon[1]} onClick={props.onClick} index={1}/>
            <PokemonPartyMember pokemon={props.pokemon[2]} onClick={props.onClick} index={2}/>
        </div>
    )
}