import { HoverPokemonData } from "components/HoverPokemonData";
import { useState } from "react";


export function PokemonPartyMember(props) {

    const [style, setStyle] = useState({display: 'none'})

    return(
        <div onMouseOver={e => {
            setStyle({display: 'table'});
        }}
        onMouseOut={e => {
            setStyle({display: 'none'});
        }}>
            <button><img src={props.pokemon.sprites.front_default} alt={props.pokemon.name}></img></button>
            <div style={style}>
                <HoverPokemonData pokemon={props.pokemon} />
            </div>
        </div>
    )
}