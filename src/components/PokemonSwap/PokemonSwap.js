import "./PokemonSwap.css";
import { SelectedPokemon } from "components";
import { PokemonOptions } from "components";
import { useEffect, useState } from "react";

export function PokemonSwap(props) {
    const [
        pokemonOptions,
        selectedPokemon,
        setSelectedPokemon,
        playerPokemon,
        setPlayerPokemon,
        setBattleFactoryState,
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
        setBattleFactoryState("battle");
    }

    return (
        <div className="pokemon-swap">
            <h1>Pokemon Swap</h1>
            <h2>Win Streak: {winStreak}</h2>
            <div className="row">
                {selectedPokemon && (
                    <div>
                        <SelectedPokemon pokemon={selectedPokemon} />
                        <button
                            onClick={() => {
                                setComplete(true);
                            }}
                        >
                            Complete Swap?
                        </button>
                    </div>
                )}
            </div>
            <div className="row">
                <PokemonOptions
                    pokemon={pokemonOptions}
                    onClick={setSelectedPokemon}
                    selectedPokemon={optionSwap}
                />
            </div>
            <div className="row">
                <PokemonOptions
                    pokemon={playerPokemon}
                    onClick={setSelectedPokemon}
                    selectedPokemon={playerSwap}
                />
                {playerPokemon.length === 3 && (
                    <button
                        onClick={() => {
                            setBattleFactoryState("battle");
                        }}
                    >
                        I like this team!
                    </button>
                )}
                {isComplete && (
                    <div>
                        <button onClick={() => {completeSwap()}}>
                            Yes, confirm and start next battle!
                        </button>
                        <button onClick={() => {setComplete(false)}}>Nooo I changed my mind!</button>
                    </div>
                )}
            </div>
        </div>
    );
}
