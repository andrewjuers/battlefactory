import { PogeyData } from "./pogey";

export function typeEffectiveness(move, defender) {
    let TE = PogeyData.getMoveResult(move, defender);
    if (
        move.name === "freeze-dry" &&
        defender.types.filter((t) => t.type.name === "water").length > 0
    )
        TE = TE * 4; // Freeze-dry vs water type
    return TE;
}

export function damageCalc(attacker, defender, move) {
    let type = typeEffectiveness(move, defender);
    let category = move.damage_class.name;
    let [attack, defense] =
        category === "physical"
            ? [attacker.base_stats[1], defender.base_stats[2]]
            : [attacker.base_stats[3], defender.base_stats[4]];
    if (move.name === "psyshock") defense = defender.base_stats[2]; // Psyshock
    if (move.name === "body-press") attack = attacker.base_stats[2]; // Body-press
    attack = statCalc(attack);
    defense = statCalc(defense);
    let power = move.priority < 0 ? move.power * 2 : move.power; // Double power of negative priority moves
    let STAB = calculateSTAB(attacker, move) ? 1.5 : 1;
    let damage = (42 * power * (attack / defense)) / 50 + 2;
    damage = Math.floor(damage * STAB * type);
    return damage;
}

export function hpCalc(stat, iv = 31, ev = 0) {
    let result = 2 * stat + iv + ev / 4 + 110;
    return Math.floor(result);
}

export function statCalc(stat, iv = 31, ev = 0, nature = 1) {
    let result = (2 * stat + iv + ev / 4 + 5) * nature;
    return Math.floor(result);
}

export function calculateSTAB(pokemon, move) {
    if (pokemon.types[0].type.name === move.type.name) return true;
    if (
        pokemon.types.length > 1 &&
        pokemon.types[1].type.name === move.type.name
    )
        return true;
    return false;
}
