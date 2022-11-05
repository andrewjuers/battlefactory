import { damageCalc } from "./damagecalc";


export function makeMove(playerTeam, opponentTeam) {
    let damage = 0;
    let choice = null;
    for (const move of opponentTeam[0].moveset) {
        [damage, choice] = damageCalc(opponentTeam[0], playerTeam[0], move) > damage ? [damageCalc(opponentTeam[0], playerTeam[0], move), move] : [damage, choice];
        // attempt for priority
        if (playerTeam[0].hp[0] - damageCalc(opponentTeam[0], playerTeam[0], move) <= 0 && move.priority > 0) return move;
    }
    return choice;
}

export function switchPokemon(playerTeam, opponentTeam) {
    if (opponentTeam[1].hp[0] > 0) {
        return 1
    }
    else if (opponentTeam[2].hp[0] > 0){
        return 2
    }
    else return -1
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
        if (m1.priority > m2.priority || (m1.priority === m2.priority && p1.base_stats[5] > p2.base_stats[5])) {
            if (doesMoveKill(p1, p2, m1)) return false;
            p2.hp[0] = p2.hp[0] - damageCalc(p1, p2, m1);
        }
        else {
            if (doesMoveKill(p2, p1, m2)) return true;
            p1.hp[0] = p1.hp[0] - damageCalc(p2, p1, m2);
        }
    }
    return p2.hp[0] > 0 || p1.hp[0] <= 0; 
}

export function doesMoveKill(attacker, defender, move) {
    return defender.hp[0] - damageCalc(attacker, defender, move) <= 0;
}