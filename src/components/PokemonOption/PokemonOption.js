
export function PokemonOption(props) {

    return(
        <div>
            <button onClick={()=>props.onClick(props.pokemon)}><img src={props.pokemon.sprites.front_default} alt={props.pokemon.name}></img></button>
        </div>
    );
}