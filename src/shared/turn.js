import { makeMove } from "./computermove";



export function doTurn(playerPokemon, opponentPokemon, move) {
    let movefirst = (playerPokemon[0].base_stats[5] > opponentPokemon[0].base_stats[5]) ? true : false;
    let text = [];
    if (movefirst) {
        text.push(turnText(playerPokemon[0], move));
        text.push(turnText(opponentPokemon[0], makeMove(playerPokemon, opponentPokemon)));
    }
    else {
        text.push(turnText(opponentPokemon[0], makeMove(playerPokemon, opponentPokemon)));
        text.push(turnText(playerPokemon[0], move));
    }
    return (text);
}

export function turnText(pokemon, move) {
    return pokemon.name + " used " + move.name + "!";
}