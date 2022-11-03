import axios from "axios";
import { Battle } from "components/Battle";
import { TeamBuilder } from "components/TeamBuilder";
import { useEffect, useState } from "react";
import { generateRandomPokemonId } from "shared";
import { hpCalc } from "shared";

export function Home() {
    const [isApiLoading, setApiLoading] = useState(true);
    const [pokemonOptions, setPokemonOptions] = useState([]);
    const [opponentPokemon, setOpponentPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [playerPokemon, setPlayerPokemon] = useState([]);
    const [battleFactoryState, setBattleFactoryState] = useState("home");

    useEffect(() => {
        for (let i = 0; i < 6; i++) {
            createRandomPokemon(pokemonOptions, i, setPokemonOptions);
        }
        for (let i = 0; i < 3; i++) {
            createRandomPokemon(opponentPokemon, i, setOpponentPokemon);
        }
        return () => {
            setTimeout(() => {
                setApiLoading(false);
            }, 5000);
        };
    }, []);

    async function createRandomPokemon(pokemonData, i, setFunc) {
        setTimeout(() => {
            axios
                .get(
                    "https://pokeapi.co/api/v2/pokemon/" +
                        generateRandomPokemonId()
                )
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
            await axios.get(move.url).then((response) => {
                if (
                    response.data.damage_class.name !== "status" &&
                    response.data.power
                )
                    moves.push(response.data);
            });
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
                Loading the data {console.log("loading state")}
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
                            setPokemonOptions,
                            opponentPokemon,
                            setOpponentPokemon,
                            selectedPokemon,
                            setSelectedPokemon,
                            playerPokemon,
                            setPlayerPokemon,
                            setBattleFactoryState,
                        ]}
                    />
                </div>
            )}
            {(battleFactoryState === "battle" && 
                <div>
                    <Battle 
                        playerPokemon={playerPokemon}
                        opponentPokemon={opponentPokemon}
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
