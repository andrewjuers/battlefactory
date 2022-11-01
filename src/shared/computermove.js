import { damageCalc } from "./damagecalc";


export function makeMove(playerTeam, opponentTeam) {
    let damage = 0;
    let choice = null;
    for (const move of opponentTeam[0].moveset) {
        [damage, choice] = damageCalc(opponentTeam[0], playerTeam[0], move) > damage ? [damageCalc(opponentTeam[0], playerTeam[0], move), move] : [damage, choice];
    }
    return choice;
}

export function switchPokemon(opponentTeam) {
    if (opponentTeam[1].hp[0] > 0) {
        return 1
    }
    else if (opponentTeam[2].hp[0] > 0){
        return 2
    }
    else return -1
}