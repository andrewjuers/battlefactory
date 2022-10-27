export class PogeyData {
    // Type -> [0: weaknesses[], 1: resists[], 2: immunities[], 3: move]
    static types = new Map([
        [
            "Water",
            [
                ["Electric", "Grass"],
                ["Water", "Fire", "Ice", "Steel"],
                [],
                "Surf",
            ],
        ],
        [
            "Fire",
            [
                ["Rock", "Ground", "Water"],
                ["Fire", "Grass", "Fairy", "Bug", "Ice", "Steel"],
                [],
                "Flamethrower",
            ],
        ],
        [
            "Grass",
            [
                ["Bug", "Fire", "Ice", "Poison", "Flying"],
                ["Electric", "Grass", "Ground", "Water"],
                [],
                "Energy Ball",
            ],
        ],
        [
            "Electric",
            [["Ground"], ["Electric", "Flying", "Steel"], [], "Thunderbolt"],
        ],
        [
            "Bug",
            [
                ["Flying", "Fire", "Rock"],
                ["Fighting", "Grass", "Ground"],
                [],
                "Bug Buzz",
            ],
        ],
        [
            "Fighting",
            [
                ["Flying", "Psychic", "Fairy"],
                ["Dark", "Bug", "Rock"],
                [],
                "Aura Sphere",
            ],
        ],
        [
            "Psychic",
            [["Ghost", "Dark", "Bug"], ["Psychic", "Fighting"], [], "Psychic"],
        ],
        [
            "Dark",
            [
                ["Fighting", "Fairy", "Bug"],
                ["Dark", "Ghost"],
                ["Psychic"],
                "Dark Pulse",
            ],
        ],
        [
            "Fairy",
            [
                ["Steel", "Poison"],
                ["Fighting", "Dark", "Bug"],
                ["Dragon"],
                "Dazzling Gleam",
            ],
        ],
        [
            "Poison",
            [
                ["Psychic", "Ground"],
                ["Bug", "Fairy", "Grass", "Poison", "Fighting"],
                [],
                "Sludge Bomb",
            ],
        ],
        [
            "Ground",
            [
                ["Water", "Grass", "Ice"],
                ["Rock", "Poison"],
                ["Electric"],
                "Earth Power",
            ],
        ],
        [
            "Rock",
            [
                ["Fighting", "Water", "Grass", "Ground", "Steel"],
                ["Normal", "Poison", "Flying", "Fire"],
                [],
                "Power Gem",
            ],
        ],
        [
            "Flying",
            [
                ["Rock", "Ice", "Electric"],
                ["Bug", "Fighting", "Grass"],
                ["Ground"],
                "Air Slash",
            ],
        ],
        [
            "Ice",
            [["Fighting", "Fire", "Rock", "Steel"], ["Ice"], [], "Ice Beam"],
        ],
        [
            "Dragon",
            [
                ["Ice", "Dragon", "Fairy"],
                ["Water", "Fire", "Grass", "Electric"],
                [],
                "Dragon Pulse",
            ],
        ],
        [
            "Steel",
            [
                ["Ground", "Fire", "Fighting"],
                [
                    "Grass",
                    "Bug",
                    "Fairy",
                    "Normal",
                    "Psychic",
                    "Rock",
                    "Flying",
                    "Ice",
                    "Dragon",
                    "Steel",
                ],
                ["Poison"],
                "Flash Cannon",
            ],
        ],
        ["Normal", [["Fighting"], [], ["Ghost"], "Hyper Voice"]],
        [
            "Ghost",
            [
                ["Dark", "Ghost"],
                ["Poison", "Bug"],
                ["Fighting", "Normal"],
                "Shadow Ball",
            ],
        ],
    ]);

    // Name -> [0: [Types], 1: Difficulty(0-2), 2: Ability]
    static pogeys = new Map([
        ["Sceptile", [["Grass"], 0, ""]],
        ["Blastoise", [["Water"], 0, ""]],
        ["Typhlosion", [["Fire"], 0, ""]],
        ["Luxray", [["Electric"], 0, ""]],
        ["Pinsir", [["Bug"], 0, ""]],
        ["Sawk", [["Fighting"], 0, ""]],
        ["Alakazam", [["Psychic"], 0, ""]],
        ["Absol", [["Dark"], 0, ""]],
        ["Clefable", [["Fairy"], 0, ""]],
        ["Garbodor", [["Poison"], 0, ""]],
        ["Hippowdon", [["Ground"], 0, ""]],
        ["Lycanroc", [["Rock"], 0, ""]],
        ["Tornadus-Therian", [["Flying"], 0, ""]],
        ["Avalugg", [["Ice"], 0, ""]],
        ["Haxorus", [["Dragon"], 0, ""]],
        ["Copperajah", [["Steel"], 0, ""]],
        ["Tauros", [["Normal"], 0, ""]],
        ["Dusknoir", [["Ghost"], 0, ""]],

        ["Tentacruel", [["Water", "Poison"], 1, ""]],
        ["Roserade", [["Grass", "Poison"], 1, ""]],
        ["Volcarona", [["Bug", "Fire"], 1, ""]],
        ["Galvantula", [["Bug", "Electric"], 1, ""]],
        ["Scizor", [["Bug", "Steel"], 1, ""]],
        ["Pangoro", [["Fighting", "Dark"], 1, ""]],
        ["Hatterene", [["Psychic", "Fairy"], 1, ""]],
        ["Sableye", [["Dark", "Ghost"], 1, ""]],
        ["Wigglytuff", [["Normal", "Fairy"], 1, ""]],
        ["Drapion", [["Poison", "Dark"], 1, ""]],
        ["Garchomp", [["Ground", "Dragon"], 1, ""]],
        ["Kabutops", [["Rock", "Water"], 1, ""]],
        ["Corviknight", [["Flying", "Steel"], 1, ""]],
        ["Jynx", [["Ice", "Psychic"], 1, ""]],
        ["Salamence", [["Dragon", "Flying"], 1, ""]],
        ["Duraludon", [["Steel", "Dragon"], 1, ""]],
        ["Oranguru", [["Normal", "Psychic"], 1, ""]],
        ["Gourgeist", [["Ghost", "Grass"], 1, ""]],

        ["Venusaur-Mega", [["Grass", "Poison"], 2, "Thick Fat"]],
        ["Seaking", [["Water"], 2, "Lightning Rod"]],
        ["Volcanion", [["Water", "Fire"], 2, "Water Absorb"]],
        ["Rotom-Heat", [["Electric", "Fire"], 2, "Levitate"]],
        ["Shedinja", [["Bug", "Ghost"], 2, "Wonder Guard"]],
        ["Chesnaught", [["Grass", "Fighting"], 2, "Bulletproof"]],
        ["Bronzong", [["Steel", "Psychic"], 2, "Heatproof"]],
        ["Raticate-Alola", [["Dark", "Normal"], 2, "Thick Fat"]],
        ["Azumarill", [["Water", "Fairy"], 2, "Sap Sipper"]],
        ["Weezing", [["Poison"], 2, "Levitate"]],
        ["Seismitoad", [["Water", "Ground"], 2, "Water Absorb"]],
        ["Lunatone", [["Rock", "Psychic"], 2, "Levitate"]],
        ["Emolga", [["Electric", "Flying"], 2, "Motor Drive"]],
        ["Mamoswine", [["Ice", "Ground"], 2, "Thick Fat"]],
        ["Dracozolt", [["Electric", "Dragon"], 2, "Volt Absorb"]],
        ["Heatran", [["Fire", "Steel"], 2, "Flash Fire"]],
        ["Ursaluna", [["Ground", "Normal"], 2, "Bulletproof"]],
        ["Marowak-Alola", [["Fire", "Ghost"], 2, "Lightning Rod"]],
    ]);

    static abilities = new Map([
        [
            "Thick Fat",
            "The power of Fire-type and Ice-type attacks against this Pokemon is halved.",
        ],
        [
            "Lightning Rod",
            "(Immunity) Boosts Special Attack by 1 stage when hit with an Electric-type move.",
        ],
        [
            "Water Absorb",
            "(Immunity) Restores HP by 1/4 when hit with a Water-type move.",
        ],
        [
            "Volt Absorb",
            "(Immunity) Restores HP by 1/4 when hit with an Electric-type move.",
        ],
        [
            "Levitate",
            "(Immunity) Grants an immunity to Ground-type attacks and grounded hazards.",
        ],
        [
            "Wonder Guard",
            "(Immunity) This Pokemon can only be hit by supereffective moves.",
        ],
        [
            "Bulletproof",
            "(Immunity) Grants an immunity to Ball, Bomb, or Sphere moves.",
        ],
        [
            "Heatproof",
            "The power of Fire-type attacks against this Pokemon is halved.",
        ],
        [
            "Sap Sipper",
            "(Immunity) Boosts Attack by 1 stage when hit with a Grass-type move.",
        ],
        [
            "Motor Drive",
            "(Immunity) Boosts Speed by 1 stage when hit with an Electric-type move.",
        ],
        [
            "Flash Fire",
            "(Immunity) Boosts the power of this Pokemon's Fire-type attacks by 1.5 when hit with a Fire-type move.",
        ],
    ]);

    static getTypeResults(types, ability) {
        let weak = [];
        let strong = [];
        let none = [];
        let type1 = PogeyData.types.get(
            capitalizeFirstLetter(types[0].type.name)
        );
        let type2 =
            types.length > 1 ? PogeyData.types.get(capitalizeFirstLetter(types[1].type.name)) : [];

        // Get weaknesses, resists, and immunities
        if (types.length > 1) {
            type1[0].forEach((weakness) => {
                if (
                    !type2[1].includes(weakness) &&
                    !type2[2].includes(weakness)
                ) {
                    weak.push(weakness);
                }
            });
            type2[0].forEach((weakness) => {
                if (
                    !type1[1].includes(weakness) &&
                    !type1[2].includes(weakness)
                ) {
                    weak.push(weakness);
                }
            });

            type1[1].forEach((resist) => {
                if (!type2[0].includes(resist) && !type2[2].includes(resist)) {
                    strong.push(resist);
                }
            });
            type2[1].forEach((resist) => {
                if (!type1[0].includes(resist) && !type1[2].includes(resist)) {
                    strong.push(resist);
                }
            });

            type1[2].forEach((immunity) => {
                none.push(immunity);
            });
            type2[2].forEach((immunity) => {
                none.push(immunity);
            });
        } else {
            weak = [...type1[0]];
            strong = [...type1[1]];
            none = [...type1[2]];
        }

        // Change typechart based on ability
        if (ability.length > 0) {
            if (ability === "Thick Fat") {
                if (!weak.includes("Fire")) {
                    strong.push("Fire");
                }
                if (!weak.includes("Ice")) {
                    strong.push("Ice");
                }
                weak = weak.filter((w) => w !== "Ice" && w !== "Fire");
            } else if (
                ability === "Lightning Rod" ||
                ability === "Volt Absorb" ||
                ability === "Motor Drive"
            ) {
                weak = weak.filter((w) => w !== "Electric");
                strong = strong.filter((r) => r !== "Electric");
                if (!none.includes("Electric")) {
                    none.push("Electric");
                }
            } else if (
                ability === "Water Absorb" ||
                ability === "Storm Drain"
            ) {
                weak = weak.filter((w) => w !== "Water");
                strong = strong.filter((r) => r !== "Water");
                if (!none.includes("Water")) {
                    none.push("Water");
                }
            } else if (ability === "Levitate") {
                weak = weak.filter((w) => w !== "Ground");
                strong = strong.filter((r) => r !== "Ground");
                if (!none.includes("Ground")) {
                    none.push("Ground");
                }
            } else if (ability === "Wonder Guard") {
                let nonWeak = Array.from(PogeyData.types.keys()).filter(
                    (ty) => !weak.includes(ty)
                );
                nonWeak.forEach((t) => {
                    if (!none.includes(t)) {
                        none.push(t);
                    }
                });
                strong = []; // weaknesses unchanged
            } else if (ability === "Bulletproof") {
                weak = weak.filter(
                    (w) =>
                        w !== "Fighting" &&
                        w !== "Grass" &&
                        w !== "Ghost" &&
                        w !== "Poison"
                );
                strong = strong.filter(
                    (r) =>
                        r !== "Fighting" &&
                        r !== "Grass" &&
                        r !== "Ghost" &&
                        r !== "Poison"
                );
                if (!none.includes("Fighting")) {
                    none.push("Fighting");
                }
                if (!none.includes("Grass")) {
                    none.push("Grass");
                }
                if (!none.includes("Ghost")) {
                    none.push("Ghost");
                }
                if (!none.includes("Poison")) {
                    none.push("Poison");
                }
            } else if (ability === "Heatproof") {
                if (!weak.includes("Fire")) {
                    strong.push("Fire");
                }
                weak = weak.filter((w) => w !== "Fire");
            } else if (ability === "Flash Fire") {
                weak = weak.filter((w) => w !== "Fire");
                strong = strong.filter((r) => r !== "Fire");
                if (!none.includes("Fire")) {
                    none.push("Fire");
                }
            } else if (ability === "Sap Sipper") {
                weak = weak.filter((w) => w !== "Grass");
                strong = strong.filter((r) => r !== "Grass");
                if (!none.includes("Grass")) {
                    none.push("Grass");
                }
            }
        }

        return [[...weak], [...strong], [...none]];
    }

    static isSuperEffective(selected, types, ability = "") {
        let weak = this.getTypeResults(types, ability)[0];
        return weak.includes(capitalizeFirstLetter(selected));
    }

    static getMoveResult(move, pokemon, ability = "") {
        let typeChart = this.getTypeResults(pokemon.types, ability);
        let wCounts = new Map();
        let rCounts = new Map();

        // Determine effectiveness multipliers
        typeChart[0].sort().forEach((t) => {
            wCounts.set(t, (wCounts.has(t) ? wCounts.get(t) * 2 : 2));
        });
        typeChart[1].sort().forEach((t) => {
            rCounts.set(t, (rCounts.has(t) ? rCounts.get(t) * 0.5 : 0.5));
        });
        // Pokemon is immune
        if (typeChart[2].includes(capitalizeFirstLetter(move.type.name))) return 0;
        // Super effective
        if (wCounts.get(capitalizeFirstLetter(move.type.name)) !== undefined) return wCounts.get(capitalizeFirstLetter(move.type.name));
        // Resist
        if (rCounts.get(capitalizeFirstLetter(move.type.name)) !== undefined) return rCounts.get(capitalizeFirstLetter(move.type.name));
        return 1;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
