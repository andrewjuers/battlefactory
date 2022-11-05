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
];

export const DEFAULT_MOVES = [
    {
        name: "tackle",
        damage_class: { name: "physical" },
        power: 75,
        priority: 0,
        pp: 100,
        effect_entries: [{ effect: "Does normal damage; tackle." }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "Bad move. Why are you reading this?" },
        ],
        type: { name: "normal" },
        accuracy: 100,
    },
    {
        name: "frustration",
        damage_class: { name: "physical" },
        power: 102,
        priority: 0,
        pp: 10,
        effect_entries: [{ effect: "Does normal damage." }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "Cool move." },
        ],
        type: { name: "normal" },
        accuracy: 100,
    },
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
        power: 65,
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
        power: 50,
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
        name: "boomburst",
        damage_class: { name: "special" },
        power: 140,
        priority: 0,
        pp: 5,
        effect_entries: [{ effect: "LOUD!" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "No additional effect. May cause ear bleeding." },
        ],
        type: { name: "normal" },
        accuracy: 100,
    },
    {
        name: "mega-kick",
        damage_class: { name: "physical" },
        power: 120,
        priority: 0,
        pp: 5,
        effect_entries: [{ effect: "KICK!" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "No additional effect. May get a foot to the face." },
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
            { flavor_text: "No additional effect. Will use the target's attack in calculation one day." },
        ],
        type: { name: "dark" },
        accuracy: 100,
    },
    {
        name: "superpower",
        damage_class: { name: "physical" },
        power: 120,
        priority: 0,
        pp: 10,
        effect_entries: [{ effect: "Superman!" }],
        flavor_text_entries: [
            { flavor_text: "Why" },
            { flavor_text: "No additional effect. Will lower attack and defense one day." },
        ],
        type: { name: "fighting" },
        accuracy: 100,
    },
];
