export const wait = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export function pokemonTypeToString(pokemon) {
    let types = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        types =
            types +
            capitalizeFirstLetter(pokemon.types[i].type.name) +
            (i === 0 && pokemon.types.length > 1 ? "/" : "");
    }
    return types;
}

export function pokemonNameToString(pokemon) {
    return capitalizeFirstLetter(pokemon.name);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function shuffle(array) {
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
