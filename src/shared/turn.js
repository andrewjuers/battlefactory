import { makeMove } from "./computermove";
import { damageCalc, typeEffectiveness } from "./damagecalc";

export function doTurn(playerPokemon, opponentPokemon, move) {
    let cpuMove = makeMove(playerPokemon, opponentPokemon);
    let movefirst = move.priority > cpuMove.priority ? true : false;
    if (move.priority === cpuMove.priority) {
        movefirst =
            playerPokemon[0].base_stats[5] > opponentPokemon[0].base_stats[5]
                ? true
                : false;
    }
    let text = [];
    if (movefirst) {
        text = addArrayToArray(
            text,
            playerTurn(playerPokemon, opponentPokemon, move)
        );
        if (opponentPokemon[0].hp[0] === 0) return text;
        text = addArrayToArray(
            text,
            playerTurn(opponentPokemon, playerPokemon, cpuMove)
        );
    } else {
        text = addArrayToArray(
            text,
            playerTurn(opponentPokemon, playerPokemon, cpuMove)
        );
        if (playerPokemon[0].hp[0] === 0) return text;
        text = addArrayToArray(
            text,
            playerTurn(playerPokemon, opponentPokemon, move)
        );
    }
    return text;
}

export function playerTurn(playerPokemon, opponentPokemon, move) {
    let text = [];
    /// Move is switch
    if (move.priority === 6) text.push(doSwitch(playerPokemon, move.index));
    /// Move is attack
    else {
        text = addArrayToArray(
            text,
            turnText(playerPokemon[0], opponentPokemon[0], move)
        );
        if (typeEffectiveness(move, opponentPokemon[0]) !== 0)
            text = addArrayToArray(
                text,
                doAttack(playerPokemon[0], opponentPokemon[0], move)
            );
    }
    return text;
}

export function turnText(attacker, defender, move) {
    let text = [attacker.name + " used " + move.name + "!"];
    if (typeEffectiveness(move, defender) === 0) {
        text.push("It doesnt't affect " + defender.name + "!");
    }
    if (
        typeEffectiveness(move, defender) > 0 &&
        typeEffectiveness(move, defender) !== 1
    ) {
        let t =
            typeEffectiveness(move, defender) > 1
                ? " It's super effective!"
                : " It's not very effective...";
        text[0] = text[0] + t;
    }
    return text;
}

export function addArrayToArray(arr1, arr2) {
    for (const elem of arr2) {
        arr1.push(elem);
    }
    return arr1;
}

export function doAttack(attacker, defender, move) {
    let text = [];
    let damage = damageCalc(attacker, defender, move);
    let damage_number = null;
    [defender.hp[0], damage_number] =
        defender.hp[0] - damage > 0
            ? [defender.hp[0] - damage, damage]
            : [0, defender.hp[0]];
    text.push(
        defender.name +
            " lost " +
            Math.round((damage_number / defender.hp[1]) * 1000) / 10 +
            "% HP!"
    );
    if (defender.hp[0] === 0) {
        text.push(defender.name + " fainted!");
    }
    return text;
}

export function doSwitch(pokemon, index) {
    let oldCurrent = pokemon[0];
    let text = "";
    if (oldCurrent.hp[0] > 0) text = "Switch out " + oldCurrent.name + "! ";
    pokemon[0] = pokemon[index];
    pokemon[index] = oldCurrent;
    text = text + "Switch in " + pokemon[0].name + "!";
    return text;
}
