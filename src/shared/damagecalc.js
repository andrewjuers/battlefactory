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
    let [attack_level, defense_level] =
        category === "physical"
            ? [attacker.stat_levels[0], defender.stat_levels[1]]
            : [attacker.stat_levels[2], defender.stat_levels[3]];
    if (move.name === "psyshock") [defense, defense_level] = [defender.base_stats[2], defender.stat_levels[1]]; // Psyshock
    if (move.name === "body-press") [attack, attack_level] = [attacker.base_stats[2], attacker.stat_levels[1]]; // Body-press
    if (move.name === "foul-play") [attack, attack_level] = [defender.base_stats[1], defender.base_stats[0]]; // Foul-play
    attack = statCalc(attack, attack_level);
    defense = statCalc(defense, defense_level);
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

export function statCalc(stat, stat_level=0, iv = 31, ev = 0, nature = 1) {
    let result = (2 * stat + iv + ev / 4 + 5) * nature;
    if (stat_level !== 0 ) {
        let [n, d] = stat_level < 0 ? [2, 2 + Math.abs(stat_level)] : [stat_level + 2, 2];
        result = result * (n / d);
    }
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
