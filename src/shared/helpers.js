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
