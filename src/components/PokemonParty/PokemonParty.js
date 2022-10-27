import { PokemonPartyMember } from "components/PokemonPartyMember";
import './PokemonParty.css';

export function PokemonParty(props) {


    return(
        <div className="pokemon-party">
            <PokemonPartyMember pokemon={props.pokemon[1]} />
            <PokemonPartyMember pokemon={props.pokemon[2]} />
        </div>
    )
}