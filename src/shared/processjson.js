import pokedex from "shared/firstgenpokedex";
import moves from "shared/allmoves";

export const lodash = require("lodash");

export function getMoveByName(name) {
    return lodash.cloneDeep(
        moves.filter((move) => {
            return move.name === name;
        })[0]
    );
}

export function getMoveById(id) {
    return lodash.cloneDeep(
        moves.filter((move) => {
            return move.id === id;
        })[0]
    );
}

export function getPokemonById(id) {
    return lodash.cloneDeep(pokedex[id]);
}

export function getPokemonByName(name) {
    return lodash.cloneDeep(
        pokedex.filter((poke) => {
            return poke.name === name;
        })[0]
    );
}
