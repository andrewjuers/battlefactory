import { PokemonOptions } from "components";
import "./TeamBuilder.css";
import { SelectedPokemon } from "components";

export function TeamBuilder(props) {
    const [
        pokemonOptions,
        selectedPokemon,
        setSelectedPokemon,
        playerPokemon,
        setPlayerPokemon,
        setBattleFactoryState,
        loadNewPokemon,
    ] = props.properties;

    function selectPokemon() {
        let temp = [...playerPokemon];
        temp.push(selectedPokemon);
        setPlayerPokemon(temp);
    }

    function deselectPokemon() {
        let temp = playerPokemon.filter((item) => item !== selectedPokemon);
        setPlayerPokemon(temp);
    }

    return (
        <div className="teambuilder-div">
            <div className="teambuilder-row">
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
            <div className="teambuilder-row">
                Pick 3: 
                <PokemonOptions
                    pokemon={pokemonOptions}
                    onClick={setSelectedPokemon}
                />
            </div>
            <div className="teambuilder-row">
                Your Team: 
                <PokemonOptions
                    pokemon={playerPokemon}
                    onClick={setSelectedPokemon}
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
            </div>
            <div className="teambuilder-row">
                {playerPokemon.length < 3 && (
                    <button
                        onClick={() => {
                            loadNewPokemon()
                        }}>REROLL!!!</button>
                )}
            </div>
        </div>
    );
}
