import { makeMove } from "./computermove";
import { damageCalc, typeEffectiveness } from "./damagecalc";
import { capitalizeFirstLetter } from "./helpers";

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
        if (opponentPokemon[0].hp[0] <= 0) return text;
        text = addArrayToArray(
            text,
            playerTurn(opponentPokemon, playerPokemon, cpuMove)
        );
    } else {
        text = addArrayToArray(
            text,
            playerTurn(opponentPokemon, playerPokemon, cpuMove)
        );
        if (playerPokemon[0].hp[0] <= 0) return text;
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
    let text = [
        capitalizeFirstLetter(attacker.name) +
            " used " +
            capitalizeFirstLetter(move.name) +
            "!",
    ];
    if (typeEffectiveness(move, defender) === 0) {
        text.push(
            "It doesnt't affect " + capitalizeFirstLetter(defender.name) + "!"
        );
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
    let damage_number = 0; /// changed to 0 from null
    [defender.hp[0], damage_number] =
        defender.hp[0] - damage > 0
            ? [defender.hp[0] - damage, damage]
            : [0, defender.hp[0]];
    text.push(
        capitalizeFirstLetter(defender.name) +
            " lost " +
            Math.round((damage_number / defender.hp[1]) * 1000) / 10 +
            "% HP!"
    );
    console.log(move);
    if (move.meta.drain > 0 && attacker.hp[0] < attacker.hp[1]) { // Drain hp (giga-drain, drain-punch)
        let hpNumber = 0;
        [hpNumber, attacker.hp[0]] =
            attacker.hp[0] + Math.floor(damage_number / 2) > attacker.hp[1]
                ? [attacker.hp[1] - attacker.hp[0], attacker.hp[1]]
                : [
                      Math.floor(damage_number / 2),
                      attacker.hp[0] + damage_number,
                  ];
        text.push(
            capitalizeFirstLetter(attacker.name) +
                " healed " +
                Math.round((hpNumber / attacker.hp[1]) * 1000) / 10 +
                "% HP!"
        );
    }
    else if (move.meta.drain < 0) {
        let hpNumber = 0;
        [hpNumber, attacker.hp[0]] =
            attacker.hp[0] - Math.floor(damage_number * (Math.abs(move.meta.drain) / 100)) <= 0
                ? [attacker.hp[0], 0]
                : [
                    Math.floor(damage_number * (Math.abs(move.meta.drain) / 100)),
                      attacker.hp[0] - Math.floor(damage_number * (Math.abs(move.meta.drain) / 100)),
                  ];
        text.push(
            capitalizeFirstLetter(attacker.name) +
                " lost " +
                Math.round((hpNumber / attacker.hp[1]) * 1000) / 10 +
                "% HP to recoil!"
        );
    }
    if (defender.hp[0] === 0) {
        text.push(capitalizeFirstLetter(defender.name) + " fainted!");
    }
    if (attacker.hp[0] === 0) {
        text.push(capitalizeFirstLetter(attacker.name) + " fainted!");
    }
    return text;
}

export function doSwitch(pokemon, index) {
    let oldCurrent = pokemon[0];
    let text = "";
    if (oldCurrent.hp[0] > 0)
        text = "Switch out " + capitalizeFirstLetter(oldCurrent.name) + "! ";
    pokemon[0] = pokemon[index];
    pokemon[index] = oldCurrent;
    text = text + "Switch in " + capitalizeFirstLetter(pokemon[0].name) + "!";
    return text;
}
