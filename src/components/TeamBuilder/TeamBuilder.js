import { PokemonOptions } from "components/PokemonOptions";
import { useState, useEffect } from "react";
import { generateRandomPokemonId, hpCalc } from "shared";
import axios from "axios";
import "./TeamBuilder.css";
import { SelectedPokemon } from "components";
import { Battle } from "components/Battle";

export function TeamBuilder() {
    const [isLoading, setLoading] = useState(true);
    const [pokemonOptions, setPokemonOptions] = useState([]);
    const [opponentPokemon, setOpponentPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [playerPokemon, setPlayerPokemon] = useState([]);
    const [isBattle, setBattle] = useState(false);

    useEffect(() => {
        const pokemonData = [];
        for (let i = 0; i < 6; i++) {
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
                        setPokemonOptions(pokemonData);
                        createMoveset(pokemonData, i, setPokemonOptions);
                    });
            }, 6000);
        }
        const opponentData = [];
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                axios
                    .get(
                        "https://pokeapi.co/api/v2/pokemon/" +
                            generateRandomPokemonId()
                    )
                    .then((response) => {
                        opponentData[i] = response.data;
                        opponentData[i].base_stats = baseStatTotalTo600(
                            opponentData[i]
                        );
                        opponentData[i].hp = [
                            hpCalc(opponentData[i].base_stats[0]),
                            hpCalc(opponentData[i].base_stats[0]),
                        ];
                        setOpponentPokemon(opponentData);
                        createMoveset(opponentData, i, setOpponentPokemon);
                    });
            }, 6000);
        }
        return () => {
            //cleanup
            setLoading(false);
        };
    }, []);

    async function createMoveset(pokemonData, index, setFunc) {
        let moves = [];
        for (let i = 0; i < pokemonData[index].moves.length; i++) {
            let move = pokemonData[index].moves[i].move;
            await axios.get(move.url).then((response) => {
                if (
                    response.data.damage_class.name !== "status" &&
                    response.data.power
                ) {
                    moves.push(response.data);
                }
            });
        }
        shuffle(moves);
        let temp = moves.slice(0, 4);
        pokemonData[index].moveset = temp;
        setFunc(pokemonData);
    }

    function updatePlayerPokemon(pokemon) {
        setPlayerPokemon(pokemon);
    }

    function updateOpponentPokemon(pokemon) {
        setOpponentPokemon(pokemon);
    }

    function selectPokemon() {
        let temp = [...playerPokemon];
        temp.push(selectedPokemon);
        setPlayerPokemon(temp);
    }

    function deselectPokemon() {
        let temp = playerPokemon.filter((item) => item !== selectedPokemon);
        setPlayerPokemon(temp);
    }

    if (isLoading) {
        if (isLoading) {
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
    }

    if (isBattle) {
        return (
            <div className="battle-factory">
                <Battle
                    opponentPokemon={opponentPokemon}
                    playerPokemon={playerPokemon}
                    updatePlayerPokemon={updatePlayerPokemon}
                    updateOpponentPokemon={updateOpponentPokemon}
                />
            </div>
        );
    }

    return (
        <div className="battle-factory">
            <div className="row">
                {selectedPokemon && (
                    <div>
                        <SelectedPokemon pokemon={selectedPokemon} />
                        {playerPokemon.length < 3 &&
                            playerPokemon.indexOf(selectedPokemon) === -1 && (
                                <button
                                    className="select-pokemon"
                                    onClick={selectPokemon}
                                >
                                    Select
                                </button>
                            )}
                        {playerPokemon.indexOf(selectedPokemon) >= 0 && (
                            <button
                                className="select-pokemon"
                                onClick={deselectPokemon}
                            >
                                Deselect
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="row">
                <PokemonOptions
                    pokemon={pokemonOptions}
                    onClick={setSelectedPokemon}
                />
            </div>
            <div className="row">
                <PokemonOptions
                    pokemon={playerPokemon}
                    onClick={setSelectedPokemon}
                />
                {playerPokemon.length === 3 && (
                    <button
                        onClick={() => {
                            setBattle(true);
                        }}
                    >
                        I like this team!
                    </button>
                )}
            </div>
        </div>
    );
}

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
