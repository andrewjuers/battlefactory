import { damageCalc } from "./damagecalc";


export function makeMove(playerTeam, opponentTeam) {
    let damage = 0;
    let choice = null;
    for (const move of opponentTeam[0].moveset) {
        [damage, choice] = damageCalc(opponentTeam[0], playerTeam[0], move) > damage ? [damageCalc(opponentTeam[0], playerTeam[0], move), move] : [damage, choice];
    }
    return choice;
}