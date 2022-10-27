import './HoverPokemonData.css';

export function HoverPokemonData(props) {

    const stat_names = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];
    const stats = stat_names.map((stat, index) => {
        return stat + ": " + props.pokemon.base_stats[index] + " ";
    })
    const abilities = [];
    for (let i=0; i<props.pokemon.abilities.length; i++) {
        abilities.push(props.pokemon.abilities[i].ability.name + " ");
    }

    const types = [];
    for (let i=0; i<props.pokemon.types.length; i++) {
        types.push(props.pokemon.types[i].type.name + (i === 0 && props.pokemon.types.length > 1 ? "/" : ""));
    }

    return(
        <div className='hover-pokemon-div'>
            <p>{props.pokemon.name}</p>
            <p>Abilities: {abilities}</p>
            <p>Type: {types}</p>
            <p>Weight: {props.pokemon.weight}</p>
            <p>Stats: {stats}</p>
        </div>
    )
}