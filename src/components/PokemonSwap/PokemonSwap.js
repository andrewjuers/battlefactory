import "./PokemonSwap.css";
import { SelectedPokemon, PokemonOptions } from "components";
import { useEffect, useState } from "react";

export function PokemonSwap(props) {
    const [
        pokemonOptions,
        selectedPokemon,
        setSelectedPokemon,
        playerPokemon,
        setPlayerPokemon,
        nextBattle,
        winStreak,
    ] = props.properties;

    const [playerSwap, setPlayerSwap] = useState(playerPokemon[0]);
    const [optionSwap, setOptionSwap] = useState(pokemonOptions[0]);
    const [isComplete, setComplete] = useState(false);

    useEffect(() => {
        setSwapSelection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemon]);

    function setSwapSelection() {
        let pokemon = playerPokemon.includes(selectedPokemon)
            ? playerPokemon
            : pokemonOptions;
        if (pokemon === playerPokemon) {
            if (playerSwap === selectedPokemon) return;
            setPlayerSwap(selectedPokemon);
        } else {
            if (optionSwap === selectedPokemon) return;
            setOptionSwap(selectedPokemon);
        }
    }

    function completeSwap() {
        let player = [...playerPokemon];
        player[player.indexOf(playerSwap)] = optionSwap;
        setPlayerPokemon(player);
        setComplete(false);
        nextBattle();
    }

    return (
        <div className="pokemon-swap">
            <div className="pokemon-swap-row">
                <h2>Pokemon Swap - Win Streak: {winStreak}</h2>
                {selectedPokemon && (
                    <div>
                        <SelectedPokemon pokemon={selectedPokemon} />
                        <button
                            className="complete-swap-button"
                            onClick={() => {
                                setComplete(true);
                            }}
                        >
                            Complete Swap?
                        </button>
                    </div>
                )}
            </div>
            <div className="pokemon-swap-row">
                <PokemonOptions
                    pokemon={pokemonOptions}
                    onClick={setSelectedPokemon}
                    selectedPokemon={optionSwap}
                />
            </div>
            <div className="pokemon-swap-row">
                <PokemonOptions
                    className="pokemonOptions"
                    pokemon={playerPokemon}
                    onClick={setSelectedPokemon}
                    selectedPokemon={playerSwap}
                />
                {playerPokemon.length === 3 && (
                    <button
                        onClick={() => {
                            nextBattle();
                        }}
                    >
                        I like this team!
                    </button>
                )}
                {isComplete && (
                    <div>
                        <button
                            onClick={() => {
                                completeSwap();
                            }}
                        >
                            Yes, complete swap and start battle!
                        </button>
                        <button
                            onClick={() => {
                                setComplete(false);
                            }}
                        >
                            Nooo I changed my mind!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
