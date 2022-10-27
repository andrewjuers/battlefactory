import { Move } from "components/Move";
import "./SelectedPokemon.css";

export function SelectedPokemon(props) {

    const moves = props.pokemon.moveset.map((move, index) => {
        return (
            <div className="row" key={index}>
                <Move 
                    move={move} 
                    onClick={()=>{}}
                />
            </div>
        );
    });

    const stat_names = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];

    const stats = props.pokemon.base_stats.map((stat, index) => {
        return (
            <div key={index}>
                <p> {stat_names[index]}: {stat} &nbsp; </p>
            </div>
        )
    })

    return (
        <div className="pokemon">
            <div className="selected-pokemon-row">
                <img className="pokemon-img"
                    src={props.pokemon.sprites.front_default}
                    alt={props.pokemon.name}
                ></img>
                <p>{props.pokemon.name} &nbsp;</p>
            </div>
            <div className="selected-pokemon-row">
                <p>STATS: </p>
                {stats}
            </div>
            <div>
                {moves !== null && (
                    <div className="selected-pokemon-row">
                        <p> MOVES: </p>
                        {moves}
                    </div>
                )}
            </div>
        </div>
    );
}
