import axios from "axios";
import { Battle } from "components";
import { TeamBuilder } from "components";
import { PokemonSwap } from "components";
import { useEffect, useState } from "react";
import { FIRST_BOSS, generateRandomPokemonId, getRandomType } from "shared";
import { hpCalc } from "shared";
import { BANNED_MOVES, DEFAULT_MOVES } from "shared";
import { wait } from "shared";

export function Home() {
    const [isApiLoading, setApiLoading] = useState(true);
    const [pokemonOptions, setPokemonOptions] = useState([]);
    const [opponentPokemon, setOpponentPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [playerPokemon, setPlayerPokemon] = useState([]);
    const [battleFactoryState, setBattleFactoryState] = useState("home");
    const [winStreak, setWinStreak] = useState(0);

    useEffect(() => {
        loadNewPokemon();
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
        /// Load
        (async () => {
            await wait(2500);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [battleFactoryState]);

    function loadNewPokemon(init = true) {
        if (init) {
            for (let i = 0; i < 6; i++) {
                createNewPokemon(pokemonOptions, i, setPokemonOptions);
            }
        }
        for (let i = 0; i < 3; i++) {
            createNewPokemon(
                opponentPokemon,
                i,
                setOpponentPokemon,
                winStreak >= 6
                    ? FIRST_BOSS[Math.floor(Math.random() * FIRST_BOSS.length)]
                    : null
            );
        }
        setTimeout(() => {
            setApiLoading(false);
        }, 5000);
    }

    function createNewPokemon(pokemonData, i, setFunc, path = null) {
        generateNewPokemon(
            pokemonData,
            i,
            setFunc,
            path === null ? generateRandomPokemonId() : path
        );
    }

    async function generateNewPokemon(pokemonData, i, setFunc, path) {
        await setTimeout(() => {
            axios
                .get("https://pokeapi.co/api/v2/pokemon/" + path)
                .then((response) => {
                    pokemonData[i] = response.data;
                    pokemonData[i].moveset = [{ name: "Tackle" }];
                    pokemonData[i].base_stats = baseStatTotalTo600(
                        pokemonData[i]
                    );
                    pokemonData[i].hp = [
                        hpCalc(pokemonData[i].base_stats[0]),
                        hpCalc(pokemonData[i].base_stats[0]),
                    ];
                    setFunc(pokemonData);
                    createRandomMoveset(pokemonData, i, setFunc);
                });
        }, 3000);
    }

    async function createRandomMoveset(pokemonArr, index, setFunc) {
        let moves = [];
        for (const m of pokemonArr[index].moves) {
            let move = m.move;
            // eslint-disable-next-line
            await axios.get(move.url).then((response) => {
                if (
                    response.data.damage_class.name !== "status" &&
                    response.data.power &&
                    (response.data.power > 69 || response.data.priority > 0) &&
                    BANNED_MOVES.includes(response.data.name) === false
                ) {
                    moves.push(response.data);
                }
            });
        }
        if (moves.length < 4) {
            let choices = [...DEFAULT_MOVES];
            shuffle(choices);
            moves = [...moves, ...choices.slice(0, 4 - moves.length)];
        }
        for (const move of moves) {
            if (move.name === "hidden-power" || move.name === "secret-power") {
                move.type.name = getRandomType();
                move.power = 90;
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

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function baseStatTotalTo600(pokemon) {
    let temp = Array(6).fill(null);
    let bst = 0;
    for (let i = 0; i < 6; i++) {
        bst += parseInt(pokemon.stats[i].base_stat);
    }
    for (let i = 0; i < 6; i++) {
        temp[i] = Math.floor(
            (parseInt(pokemon.stats[i].base_stat) * 600) / bst
        );
    }
    return temp;
}
