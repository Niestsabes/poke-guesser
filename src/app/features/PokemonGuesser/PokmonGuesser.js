import React from "react";
import PokemonApi from '../../../api/pokemon.api';
import RandomPokemon from "../../components/RandomPokemon/RandomPokemon";
import Keyboard from "../../components/Keyboard/Keyboard";
import PlayerHealth from "../../components/PlayerHealth/PlayerHealth";
import PokemonHealth from "../../components/PokemonHealth/PokemonHealth";

/**
 * @class PokemonGuesser
 * @property {PokemonApi} pokeApi
 * @property {boolean} mounted
 */
export default class PokemonGuesser extends React.Component {

    pokeApi;
    mounted = false;

    constructor(props) {
        super(props);
        this.pokeApi = new PokemonApi();
        this.state = {
            currentPokemon: null,
            listSubmitLetter: [],
            health: 5,
            maxHealth: 5,
            isGuessWon: false,
            isGuessLost: false,
        };
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handlePokemonMissed = this.handlePokemonMissed.bind(this);
        this.handlePokemonDiscovered = this.handlePokemonDiscovered.bind(this);
    }

    render() {
        return <section className='d-flex flex-column align-items-center'>
            <RandomPokemon
                pokemon={this.state.currentPokemon}
                isRevealed={this.state.isGuessWon || this.state.isGuessLost}>
            </RandomPokemon>
            <div className="w-100 d-flex justify-content-evenly">
                <PlayerHealth
                    maxHealth={this.state.maxHealth}
                    health={this.state.health}>
                </PlayerHealth>
                <PokemonHealth
                    pokemon={this.state.currentPokemon}
                    letters={this.state.listSubmitLetter}
                    onMiss={this.handlePokemonMissed}
                    onDiscovered={this.handlePokemonDiscovered}>
                </PokemonHealth>
            </div>
            <Keyboard
                usedLetters={this.state.listSubmitLetter}
                disabled={this.state.isGuessWon || this.state.isGuessLost}
                onKeyPress={this.handleKeyPressed}>
            </Keyboard>
        </section>
    }
    
    componentDidMount() {
        if (!this.mounted) {
            this.mounted = true;
            this.fetchRandomPokemon();
        }
    }
    
    fetchRandomPokemon() {
        this.setState({ mounted: true });
        const pokeId = Math.floor(Math.random() * 900 + 1);
        this.pokeApi.getPokemon(pokeId).then( poke => {
            this.setState({ currentPokemon: poke });
        });
    }

    /**
     * @event (onKeyPress) from Keyboard
     * @param {char} key
     */
    handleKeyPressed(key) {
        if (!this.state.listSubmitLetter.includes(key)) {
            this.setState({ listSubmitLetter: this.state.listSubmitLetter.concat([key]) });
        }
    }

    /**
     * @event (onMiss) from PokemonHealth
     * @param {char} key 
     */
    handlePokemonMissed(key) {
        this.setState({
            health: this.state.health - 1,
            isGuessLost: !this.state.isGuessWon && this.state.health - 1 <= 0
        });
    }

    /**
     * @event (onDiscovered) from PokemonHealth
     * @param {object} pokemon 
     */
    handlePokemonDiscovered(pokemon) {
        this.setState({
            isGuessWon: true
        });
    }
}