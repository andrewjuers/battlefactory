import { Battle } from "components";
import { TeamBuilder } from "components";
import { PokemonSwap } from "components";
import React, { useEffect, useState } from "react";
import { baseStatTotalTo600, generateRandomPokemon, getMoveByName, getRandomType, shuffle } from "shared";
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
        /// Update winstreak
        if (battleFactoryState === "swap") setWinStreak(winStreak + 1);
        else if (
            battleFactoryState === "teambuild" &&
            playerPokemon.length > 0
        ) {
            setWinStreak(0);
            setPlayerPokemon([]);
            loadNewPokemon();
        }
        /// New opponent pokemon
        if (
            winStreak > 0 &&
            battleFactoryState !== "swap" &&
            battleFactoryState === "battle"
        )
            loadNewPokemon(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [battleFactoryState]);

    function loadNewPokemon(init = true) {
        if (init) {
            for (let i = 0; i < 6; i++) {
                randomNewPokemon(pokemonOptions, i, setPokemonOptions);
            }
        }
        for (let i = 0; i < 3; i++) {
            randomNewPokemon(opponentPokemon, i, setOpponentPokemon);
        }
        forceUpdate();
    }

    function randomNewPokemon(pokemonData, i, setFunc) {
        pokemonData[i] = generateRandomPokemon(pokemonData);
        pokemonData[i].base_stats = baseStatTotalTo600(pokemonData[i]);
        pokemonData[i].moveset = [{ name: "Tackle" }];
        pokemonData[i].hp = [
            hpCalc(pokemonData[i].base_stats[0]),
            hpCalc(pokemonData[i].base_stats[0]),
        ];
        createRandomMoveset(pokemonData, i, setFunc);
        setFunc(pokemonData);
    }

    function createRandomMoveset(pokemonArr, index, setFunc) {
        let moves = [];
        for (const move of pokemonArr[index].moves) {
            let m = getMoveByName(move.move.name);
            if (
                m.damage_class.name !== "status" &&
                m.power &&
                (m.power > 69 || m.priority > 0) &&
                BANNED_MOVES.includes(m.name) === false
            ) {
                moves.push(m);
            }
        }
        if (moves.length < 4) {
            let choices = [...DEFAULT_MOVES];
            shuffle(choices);
            moves = [...moves, ...choices.slice(0, 4 - moves.length)];
        }
        for (const move of moves) {
            if (move.name === "hidden-power" || move.name === "secret-power") {
                move.type.name = getRandomType();
                move.power = 80;
            }
        }
        shuffle(moves);
        let temp = moves.slice(0, 4);
        pokemonArr[index].moveset = temp;
        setFunc(pokemonArr);
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
                Loading the data... {console.log("loading state")}
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
                            setBattleFactoryState,
                            winStreak,
                        ]}
                    />
                </div>
            )}
        </div>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////^^^^
