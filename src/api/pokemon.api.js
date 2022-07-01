import axios from "axios";

const rootApi = 'https://pokeapi.co/api/v2/';

function PokemonApi() {};

/**
 * Retrieve Pokemon data from api.
 * @param {number|string} idOrName
 */
PokemonApi.prototype.getPokemon = function(idOrName) {
    return axios.get(rootApi + `pokemon/${idOrName}`)
        .then( output => { return output.data; } );
};

export default PokemonApi;