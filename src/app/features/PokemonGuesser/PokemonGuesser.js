import React from "react";
import PokemonApi from '../../services/PokeApi.service.js';
import APP_CONFIG from "../../../config/config";
import PokemonRender from "../../components/PokemonRender/PokemonRender";
import PlayerKeyboard from "../../components/PlayerKeyboard/PlayerKeyboard";
import PlayerHealth from "../../components/PlayerHealth/PlayerHealth";
import PokemonHealth from "../../components/PokemonHealth/PokemonHealth";
import EndGuessModal from "../../components/EndGuessModal/EndGuessModal";
import Storage from "../../services/Storage.service";

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
            health: APP_CONFIG.game.maxLife,
            maxHealth: APP_CONFIG.game.maxLife,
            isGuessWon: false,
            isGuessLost: false,
            isGameSaved: false
        };
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handlePokemonMissed = this.handlePokemonMissed.bind(this);
        this.handlePokemonDiscovered = this.handlePokemonDiscovered.bind(this);
    }

    render() {
        // This modal is renderes only if the game is over
        let endGameModal = null;
        if (this.state.isGuessLost || this.state.isGuessWon) {
            endGameModal = <EndGuessModal
                pokemon={this.state.currentPokemon}
                listLetter={this.state.listSubmitLetter}
                isGameWon={this.state.isGuessWon}>
            </EndGuessModal>
        }

        return <section className='d-flex flex-column align-items-center'>
            <PokemonRender
                pokemon={this.state.currentPokemon}
                isRevealed={this.state.isGuessWon || this.state.isGuessLost}>
            </PokemonRender>
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
            <PlayerKeyboard
                usedLetters={this.state.listSubmitLetter}
                disabled={this.state.isGuessWon || this.state.isGuessLost}
                onKeyPress={this.handleKeyPressed}>
            </PlayerKeyboard>
            {endGameModal}
        </section>
    }
    
    componentDidMount() {
        if (!this.mounted) {
            this.mounted = true;
            this.loadCurrentGameData();
        }
    }
    
    componentDidUpdate() {
        this.saveCurrentGameData();
        if ((this.state.isGuessWon || this.state.isGuessLost) && !this.state.isGameSaved) {
            this.saveGame();
            this.setState({ isGameSaved: true });
        } 
    }

    /**
     * Hydrates this components with current game data stored in localStorage
     */
    loadCurrentGameData() {
        let game = Storage.getCurrentGame();
        if (!game) {
            game = {
                date: Date.now(),
                pokeId: Math.floor(Math.random() * 900 + 1),
                playedLetters: [],
                isCompleted: false
            };
            Storage.setCurrentGame(game);
        }
        this.pokeApi.getPokemon(game.pokeId).then( poke => {
            this.setState({
                currentPokemon: poke,
                listSubmitLetter: game.playedLetters,
                health: APP_CONFIG.game.maxLife,
                isGameSaved: game.isCompleted
            });
        });
    }

    /**
     * Saves current game data in localStorage
     */
    saveCurrentGameData() {
        Storage.setCurrentGame({
            date: Date.now(),
            pokeId: this.state.currentPokemon.id,
            playedLetters: this.state.listSubmitLetter,
            isCompleted: this.state.isGuessWon || this.state.isGuessLost
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
     * @param {string[]} listMiss 
     */
    handlePokemonMissed(listMiss) {
        if (!this.state.isGuessLost) {
            this.setState({
                health: this.state.health - listMiss.length,
                isGuessLost: !this.state.isGuessWon && this.state.health - listMiss.length <= 0
            });
        }
    }

    /**
     * @event (onDiscovered) from PokemonHealth
     * @param {object} pokemon 
     */
    handlePokemonDiscovered(pokemon) {
        if (!this.state.isGuessWon) {
            this.setState({ isGuessWon: true });
        }
    }

    /**
     * Save user game data after game end
     */
    saveGame() {
        let userStats = Storage.getUserStats();
        userStats.listGame.push({
            date: Date.now(),
            isWon: this.state.isGuessWon,
            lifeCount: this.state.health,
            letterCount: this.state.listSubmitLetter.length
        });
        if (this.state.isGuessWon) {
            userStats.currentStreak++;
            userStats.bestStreak = Math.max(userStats.currentStreak, userStats.bestStreak);
        } else {
            userStats.currentStreak = 0;
        }
        Storage.setUserStats(userStats);
    }

}