import { Battle } from "components";
import { TeamBuilder } from "components";
import { PokemonSwap } from "components";
import { BossDisplay } from "components";
import React, { useEffect, useState } from "react";
import {
    baseStatTotalTo600,
    generateRandomPokemon,
    getGoodRandomMoveset,
    getMoveByName,
    getPokemonByName,
    getRandomInt,
    getRandomType,
    shuffle,
    TRAINER_ALAZAR,
    TRAINER_BLAKE,
} from "shared";
import { hpCalc } from "shared";
import { BANNED_MOVES, DEFAULT_MOVES } from "shared";

export function Home() {
    const [isApiLoading, setApiLoading] = useState(true);
    const [pokemonOptions, setPokemonOptions] = useState([]);
    const [opponentPokemon, setOpponentPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [playerPokemon, setPlayerPokemon] = useState([]);
    const [battleFactoryState, setBattleFactoryState] = useState("home");
    const [winStreak, setWinStreak] = useState(0);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        loadNewPokemon(true);
        setApiLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        forceUpdate();
        if (isApiLoading) return;
        /// glitchy
        setSelectedPokemon(null);
        /// Pokemon Center :)
        let [temp, dumb] = [[...playerPokemon], [...opponentPokemon]];
        for (const arr of [temp, dumb]) {
            for (const poke of arr) poke.hp[0] = poke.hp[1];
        }
        setPlayerPokemon(temp);
        setOpponentPokemon(dumb);
        /// (Lose) reset playerPokemon and reset winStreak
        if (battleFactoryState === "home" && playerPokemon.length > 0) {
            setPlayerPokemon([]);
            setWinStreak(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [battleFactoryState]);

    function loadNewPokemon(init = true) {
        setSelectedPokemon(null);
        if (init) {
            for (let i = 0; i < 6; i++) {
                randomNewPokemon(pokemonOptions, i, setPokemonOptions);
            }
        }
        for (let i = 0; i < 3; i++) {
            if ((winStreak + 1) % 7 !== 0 || winStreak >= 14)
                randomNewPokemon(opponentPokemon, i, setOpponentPokemon);
            else {
                if (winStreak === 6)
                    opponentPokemon[i] = getPokemonByName(
                        TRAINER_BLAKE.pokemon[i]
                    );
                if (winStreak === 13)
                    opponentPokemon[i] = getPokemonByName(
                        TRAINER_ALAZAR.pokemon[i]
                    );
                getPokemonData(opponentPokemon, i, setOpponentPokemon);
                createRandomMoveset(opponentPokemon, i, setOpponentPokemon);
                setOpponentPokemon(opponentPokemon);
            }
        }
        forceUpdate();
    }

    function randomNewPokemon(pokemonData, i, setFunc) {
        pokemonData[i] = generateRandomPokemon(pokemonData);
        getPokemonData(pokemonData, i, setFunc);
        createRandomMoveset(pokemonData, i, setFunc);
        setFunc(pokemonData);
    }

    function getPokemonData(pokemonData, i, setFunc) {
        pokemonData[i].base_stats = baseStatTotalTo600(pokemonData[i]);
        pokemonData[i].moveset = [{ name: "Tackle" }];
        pokemonData[i].hp = [
            hpCalc(pokemonData[i].base_stats[0]),
            hpCalc(pokemonData[i].base_stats[0]),
        ];
        setFunc(pokemonData);
    }

    function createRandomMoveset(pokemonArr, index, setFunc) {
        let moves = [];
        let pokemon = pokemonArr[index];
        /// Determine whether pokemon should use physical, special, or both categories of moves
        let diff = Math.abs(pokemon.base_stats[1] - pokemon.base_stats[3]);
        let attack =
            diff > 30 ||
            !(pokemon.base_stats[1] > 75 && pokemon.base_stats[3] > 75)
                ? "attack"
                : null;
        if (attack !== null)
            attack =
                pokemon.base_stats[1] > pokemon.base_stats[3]
                    ? "physical"
                    : "special";
        /// New move arr
        let newMoves = [];
        for (const move of pokemonArr[index].moves) {
            let m = getMoveByName(move.move.name);
            newMoves.push(m);
            if (
                m.damage_class.name !== "status" &&
                m.power &&
                (m.power > 50 || m.priority > 0) &&
                BANNED_MOVES.includes(m.name) === false
            ) {
                if (
                    attack === null ||
                    m.damage_class.name === attack ||
                    (m.priority > 0 && m.damage_class.name === "physical") /// for physical priority moves (& not vacuum wave lol)
                )
                    moves.push(m);
            }
        }
        /// update pokemon moves;
        pokemonArr[index].moves_data = newMoves;
        if (moves.length < 4) {
            let choices = [...DEFAULT_MOVES];
            shuffle(choices);
            moves = [...moves, ...choices];
        }
        for (const move of moves) {
            if (move.name === "hidden-power" || move.name === "secret-power") {
                move.type.name = (" " + getRandomType()).slice(1);
                move.power = 80;
            } else if (move.priority < 1) {
                if (move.power < 75) move.power = 75;
                if (move.power > 95 && move.meta.drain >= 0) move.power = 95; // Buff recoil moves
                else if (move.name === "tri-attack")
                    move.type.name = ["fire", "electric", "ice"][
                        getRandomInt(3)
                    ];
            }
        }
        shuffle(moves);
        pokemonArr[index].moveset = getGoodRandomMoveset(moves);
        setFunc(pokemonArr);
    }

    function nextBattle() {
        if ((winStreak + 1) % 7 === 0 && battleFactoryState === "swap") {
            setBattleFactoryState("boss");
            return;
        }
        setApiLoading(true);
        loadNewPokemon(false);
        setBattleFactoryState("battle");
        setApiLoading(false);
    }

    if (isApiLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                Loading the data...
            </div>
        );
    }

    return (
        <div>
            {battleFactoryState === "home" && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <h1>Battle Factory</h1>
                    <button
                        onClick={() => {
                            loadNewPokemon();
                            setBattleFactoryState("teambuild");
                        }}
                    >
                        Start!
                    </button>
                </div>
            )}
            {battleFactoryState === "teambuild" && (
                <div>
                    <TeamBuilder
                        properties={[
                            pokemonOptions,
                            selectedPokemon,
                            setSelectedPokemon,
                            playerPokemon,
                            setPlayerPokemon,
                            setBattleFactoryState,
                            loadNewPokemon,
                        ]}
                    />
                </div>
            )}
            {battleFactoryState === "battle" && (
                <div>
                    <Battle
                        playerPokemon={playerPokemon}
                        opponentPokemon={opponentPokemon}
                        setBattleFactoryState={setBattleFactoryState}
                        winStreak={winStreak}
                        setWinStreak={setWinStreak}
                    />
                </div>
            )}
            {battleFactoryState === "swap" && (
                <div>
                    <PokemonSwap
                        properties={[
                            opponentPokemon,
                            selectedPokemon,
                            setSelectedPokemon,
                            playerPokemon,
                            setPlayerPokemon,
                            nextBattle,
                            winStreak,
                        ]}
                    />
                </div>
            )}
            {battleFactoryState === "boss" && (
                <div>
                    <BossDisplay
                        winStreak={winStreak}
                        nextBattle={nextBattle}
                    />
                </div>
            )}
        </div>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////^^^^
