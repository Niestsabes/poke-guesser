const dicoPokemon = require('../../assets/data/pokemon-data.json');
const normalizeName = function(s){
    var r = s.toLowerCase();
    r = r.replace(new RegExp("\\s", 'g'),"");
    r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
    r = r.replace(new RegExp("æ", 'g'),"ae");
    r = r.replace(new RegExp("ç", 'g'),"c");
    r = r.replace(new RegExp("[èéêë]", 'g'),"e");
    r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
    r = r.replace(new RegExp("ñ", 'g'),"n");                            
    r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
    r = r.replace(new RegExp("œ", 'g'),"oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
    r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
    r = r.replace(new RegExp("\\W", 'g'),"");
    return r.toUpperCase();
};

function PokemonApi() {};

/**
 * Retrieve Pokemon data from api.
 * @param {number|string} idOrName
 */
PokemonApi.prototype.getPokemon = function(id, lang = 'en') {
    let poke = dicoPokemon[id];
    if (!poke) {throw new Error("Invalid pokemon id"); }
    poke.id = id;
    poke.name = normalizeName(poke.names[lang]);
    poke.language = lang;
    // eslint-disable-next-line
    poke.image = require(`./../../assets/images/pokemon/poke_${poke.id}.png`);
    return poke;
};

const PokeApi = new PokemonApi();

export default PokeApi;