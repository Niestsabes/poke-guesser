import axios from "axios";
import APP_CONFIG from "../../config/config";

function PokemonApi() {};

/**
 * Retrieve Pokemon data from api.
 * @param {number|string} idOrName
 */
PokemonApi.prototype.getPokemon = function(idOrName) {
    return axios.get(APP_CONFIG.extUrl.pokeApi + `pokemon/${idOrName}`)
        .then( output => { return output.data; } );
};

export default PokemonApi;