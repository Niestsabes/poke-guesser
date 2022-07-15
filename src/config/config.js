const APP_CONFIG = {
    app: {
        name: 'PokeGuesser',
        url: 'https://pokeguesser.azurewebsites.net',
    },
    extUrl: {
        pokeApi: 'https://pokeapi.co/api/v2/',
        pokeApiWebsite: 'https://pokeapi.co/',
        pokedex: 'https://www.pokemon.com/us/pokedex/',
        git: 'https://github.com/Niestsabes/poke-guesser',
        whosThatPokemon: 'https://knowyourmeme.com/memes/whos-that-pokemon',
        pokemonShowdown: 'https://pokemonshowdown.com/',
        twitter: {
            joshWardle: 'https://twitter.com/powerlanguish',
            pokemon: 'https://twitter.com/Pokemon'
        }
    },
    defaultKeyboard: 'qwerty',
    configDefault: {
        keyboard: 'qwerty'
    },
    keyboard: {
        azerty: [
            ['A', 'Z', 'E', 'R', 'T','Y', 'U', 'I', 'O', 'P'],
            ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
            ['Enter', 'W', 'X', 'C', 'V', 'B', 'N', 'Back']
        ],
        bepo: [
            ['B', 'E', 'P', 'O', 'W', 'V', 'D', 'L', 'J', 'Z'],
            ['A', 'U', 'I', 'C', 'T', 'S', 'R', 'N', 'M'],
            ['Enter', 'Y', 'X', 'K', 'Q', 'G', 'H', 'F', 'Back']
        ],
        qwerty: [
            ['Q', 'W', 'E', 'R', 'T','Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']
        ],
        qwertz: [
            ['Q', 'W', 'E', 'R', 'T','Z', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Enter', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']
        ]
    },
    game: {
        maxLife: 5,
        maxPokeId: 905
    }
}

export default APP_CONFIG;