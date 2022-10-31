import { HealthBar } from "components";
import { HoverPokemonData } from "components/HoverPokemonData";
import { useState } from "react";
import './CurrentPokemon.css';

export function CurrentPokemon(props) {

    const [style, setStyle] = useState({display: 'none'})

    return(
        <div onMouseOver={e => {
            setStyle({display: 'table'});
        }}
        onMouseOut={e => {
            setStyle({display: 'none'});
        }}>
            <HealthBar 
                label="" value={props.pokemon.hp[0]} maxValue={props.pokemon.hp[1]}
            />
            <img src={props.img} alt=""></img>
            <div style={style} className="display-hover-pokemon-div">
                <HoverPokemonData pokemon={props.pokemon} />
            </div>
        </div>
    )
}