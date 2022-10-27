import axios from "axios";


export function typeEffectiveness(attack, defender) {
    
}

async function loadType(type) {
    let data = [];
    await axios.get(type.type.url).then((response) => {
        data = response.data
    })
}