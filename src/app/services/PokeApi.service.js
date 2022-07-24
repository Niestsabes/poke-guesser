const dicoPokemon = require('../../assets/data/pokemon-data.json');

function PokemonApi() {};

/**
 * Retrieve Pokemon data from api.
 * @param {number|string} idOrName
 */
PokemonApi.prototype.getPokemon = function(id) {
    let poke = dicoPokemon[id];
    if (!poke) {throw new Error("Invalid pokemon id"); }
    poke.id = id;
    poke.name = poke.names.en;
    // eslint-disable-next-line
    poke.image = require(`./../../assets/images/pokemon/poke_${poke.id}.png`);
    return poke;
};

const PokeApi = new PokemonApi();

export default PokeApi;