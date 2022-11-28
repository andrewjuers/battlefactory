export const BANNED_MOVES = [
    "dream-eater",
    "dig",
    "dive",
    "fly",
    "uproar",
    "focus-punch",
    "hyper-beam",
    "giga-impact",
    "sky-drop",
    "skull-bash",
    "steel-roller",
    "dynamic-punch",
    "belch",
    "zap-cannon",
    "solar-beam",
    "solar-blade",
    "petal-dance",
    "burn-up",
    "last-resort",
    "sky-attack",
    "thrash",
    "meteor-beam",
    "steel-beam",
    "round",
    "future-sight", /// For now
    "explosion",
    "self-destruct",
    "covet", /// Bad move, maybe buff/make useful
    "swift",
    "bubble-beam", /// snorlax??
    "eruption",
    "water-spout",
    "blast-burn",
    "frenzy-plant",
    "hydro-cannon",
    "synchronoise",
    "strength", // boring
    "slash", // 70 bp lame
    "razor-wind", // ? lol
    "slam", // slam
    "headbutt", // butthead
    "vice-grip", // crabs
    "take-down", // too many, mabye unban and buff?
    "horn-attack", // just no
];

export const GOOD_MOVES = [
    "quick-attack",
    "extreme-speed",
    "aqua-jet",
    "bullet-punch",
    "first-impression",
    "ice-shard",
    "mach-punch",
    "shadow-sneak", /// not in gen1
    "sucker-punch", /// power nerf to 70, gonna buff back to 80
    "overheat",
    "thunder",
    "blizzard",
    "leaf-storm",
    "earthquake",
    "stone-edge",
    "close-combat",
    "superpower",
    "flare-blitz",
    "brave-bird",
    "hydro-pump",
    "draco-meteor",
    "outrage",
    "megahorn",
    "dark-pulse",
    "crunch",
    "throat-chop", /// buff this move to at least 90-95 for the lols
];

export const DEFAULT_MOVES = [
    {
        name: "secret-power",
        damage_class: { name: "physical" },
        power: 70,
        priority: 0,
        pp: 10,
        effect_entries: [{ effect: "Does normal damage." }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "Cool move. Will be random type one day." },
        ],
        type: { name: "normal" },
        accuracy: 100,
    },
    {
        name: "hidden-power",
        damage_class: { name: "special" },
        power: 70,
        priority: 0,
        pp: 10,
        effect_entries: [{ effect: "*hidden*" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "Cool move. Will be random type one day." },
        ],
        type: { name: "normal" },
        accuracy: 100,
    },
    {
        name: "knock-off",
        damage_class: { name: "physical" },
        power: 95,
        priority: 0,
        pp: 10,
        effect_entries: [{ effect: "Knock Knock" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "Knocks off the item." },
        ],
        type: { name: "dark" },
        accuracy: 100,
    },
    {
        name: "quick-attack",
        damage_class: { name: "physical" },
        power: 40,
        priority: 1,
        pp: 10,
        effect_entries: [{ effect: "G2GFAST" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "Usually moves first ;)" },
        ],
        type: { name: "normal" },
        accuracy: 100,
    },
    {
        name: "foul-play",
        damage_class: { name: "physical" },
        power: 95,
        priority: 0,
        pp: 10,
        effect_entries: [{ effect: "Not fair!" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            {
                flavor_text:
                    "No additional effect. Will use the target's attack in calculation one day.",
            },
        ],
        type: { name: "dark" },
        accuracy: 100,
    },
];
