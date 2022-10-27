import axios from "axios";

// export function getRandomPokemon() {
//     return getPokemonData(generateRandomPokemonId());
// }

export function generateRandomPokemonId() {
    return Math.floor(Math.random() * 152);
}

export function getPokemonName(data) {
    return data["forms"][0]["name"];
}

export function getPokemonStats(data) {
    let temp = Array(6).fill(null);
    for (let i = 0; i < 6; i++) {
        temp[i] = parseInt(data["stats"][i]["base_stat"]);
    }
    temp = getPokemonBstTo600(temp);
    return temp;
}

export function getPokemonMoves(data) {
    let temp = Array(4).fill(null);
    for (let i = 0; i < 4; i++) {
        let j = Math.floor(Math.random() * data["moves"]["length"]);
        temp[i] = data["moves"][j]["move"]["name"];
    }
    return temp;
}

export function getPokemonImg(pokemonId) {
    return (
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        pokemonId.toString() +
        ".png"
    );
}

export function getPokemonBstTo600(stats) {
    let temp = Array(6).fill(null);
    let bst = 0;
    for (let i = 0; i < 6; i++) {
        bst += parseInt(stats[i]);
    }
    for (let i = 0; i < 6; i++) {
        temp[i] = Math.floor((parseInt(stats[i]) * 600) / bst);
    }
    return temp;
}

export async function createPokemon(setPokemon, index) {
    let pokemonData = null;
    await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + generateRandomPokemonId())
        .then((response) => {
            pokemonData = response.data;
            pokemonData.moveset = [{"name": "Tackle"}];
            setPokemon(pokemonData, index);
        });
}

export async function createMoves(pokemonData) {
    let moves = [];
    for (let i = 0; i < pokemonData.moves.length; i++) {
        let move = pokemonData.moves[i].move;
        await axios.get(move.url).then((response) => {
            if (
                response.data.damage_class.name !== "status" &&
                response.data.power
            ) {
                moves.push(response.data);
            }
        });
    }
    console.log(moves);
}
