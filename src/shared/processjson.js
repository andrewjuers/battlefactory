import pokedex from "shared/firstgenpokedex";
import moves from "shared/allmoves";

export function getMoveByName(name) {
    return moves.filter(move => {
        return move.name === name;
    })[0];
}

export function getMoveById(id) {
    return moves.filter(move => {
        return move.id === id;
    })[0];
}

export function getPokemonById(id) {
    return pokedex[id];
}