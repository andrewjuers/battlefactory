import { damageCalc } from "./damagecalc";

export function makeMove(playerTeam, opponentTeam) {
    for (const move of opponentTeam[0].moveset) {
        // attempt for priority
        if (
            playerTeam[0].hp[0] -
                damageCalc(opponentTeam[0], playerTeam[0], move) <=
                0 &&
            move.priority > 0
        )
            return move;
        // above works, attempt 2 for last hit before dying
        if (
            opponentTeam[0].hp[0] -
                damageCalc(
                    playerTeam[0],
                    opponentTeam[0],
                    strongestMove(opponentTeam, playerTeam)
                ) <=
                0 &&
            move.priority > 0 &&
            playerTeam[0].base_stats[5] > opponentTeam[0].base_stats[5]
        )
            return move;
    }
    return strongestMove(playerTeam, opponentTeam);
}

export function strongestMove(playerTeam, opponentTeam) {
    let damage = 0;
    let choice = null;
    for (const move of opponentTeam[0].moveset) {
        [damage, choice] =
            damageCalc(opponentTeam[0], playerTeam[0], move) > damage
                ? [damageCalc(opponentTeam[0], playerTeam[0], move), move]
                : [damage, choice];
    }
    return choice;
}

export function switchPokemon(playerTeam, opponentTeam) {
    let options = opponentTeam.filter(poke => poke != opponentTeam[0] && poke.hp[0] > 0);
    for (const option of options) {
        if (option.base_stats[5] > playerTeam[0].base_stats[5] && damageCalc(option, playerTeam[0], strongestMove(playerTeam, [option]))) {
            return opponentTeam.indexOf(option);
        }
    }
    let damages = options.map((poke) => {
        return damageCalc(poke, playerTeam[0], strongestMove(playerTeam, [poke]));
    });
    if (options.length > 1 && damages[0] < damages[1]) return opponentTeam.indexOf(options[1]);
    else if (options.length >= 1) return opponentTeam.indexOf(options[0]); 
    else return -1;
}

export function bestSwitch(playerTeam, opponentTeam) {
    let damages = [];

    for (const poke of opponentTeam) {
        let move = makeMove(playerTeam, [poke]);
        let damage = damageCalc(poke, playerTeam[0], move);
        damages.push([move, damage]);

        if (poke.base_stats[5] >= playerTeam[0].base_stats[5]) {
            if (whoWins(playerTeam, [poke])) return opponentTeam.indexOf(poke);
        }
    }

    return opponentTeam.indexOf(damages.sort((a, b) => a[1] - b[1])[0]);
}

export function whoWins(playerTeam, opponentTeam) {
    let [p1, p2] = [playerTeam[0], opponentTeam[0]];
    while (p1.hp[0] > 0 && p2.hp[0] > 0) {
        let m1 = makeMove(opponentTeam, playerTeam);
        let m2 = makeMove(playerTeam, opponentTeam);
        if (
            m1.priority > m2.priority ||
            (m1.priority === m2.priority && p1.base_stats[5] > p2.base_stats[5])
        ) {
            if (doesMoveKill(p1, p2, m1)) return false;
            p2.hp[0] = p2.hp[0] - damageCalc(p1, p2, m1);
        } else {
            if (doesMoveKill(p2, p1, m2)) return true;
            p1.hp[0] = p1.hp[0] - damageCalc(p2, p1, m2);
        }
    }
    return p2.hp[0] > 0 || p1.hp[0] <= 0;
}

export function doesMoveKill(attacker, defender, move) {
    return defender.hp[0] - damageCalc(attacker, defender, move) <= 0;
}
