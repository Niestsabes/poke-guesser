import React from "react";
import APP_CONFIG from "../../../config/config";
import PokeApi from '../../services/PokeApi.service';
import Storage from "../../services/Storage.service";
import DateHelper from "../../services/Date.service";
import PlayerKeyboard from "./components/PlayerKeyboard/PlayerKeyboard";
import PlayerHealth from "./components/PlayerHealth/PlayerHealth";
import PokemonHealth from "./components/PokemonHealth/PokemonHealth";
import PokemonRender from "./components/PokemonRender/PokemonRender";
import EndGuessModal from "./modals/EndGuessModal/EndGuessModal";

/**
 * @class PokemonGuesser
 * @property {boolean} mounted
 */
export default class PokemonGuesser extends React.Component {

    mounted = false;
    animateRenderer = false;

    constructor(props) {
        super(props);
        this.state = {
            gameDate: undefined,
            currentPokemon: undefined,
            listSubmitLetter: [],
            health: APP_CONFIG.game.maxLife,
            maxHealth: APP_CONFIG.game.maxLife,
            isGuessWon: false,
            isGuessLost: false,
            isGameSaved: false
        };
        this.pokemonRenderRef = React.createRef();
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handlePokemonMissed = this.handlePokemonMissed.bind(this);
        this.handlePokemonDiscovered = this.handlePokemonDiscovered.bind(this);
    }

    render() {
        // This modal is renderes only if the game is over
        let endGameModal = null;
        if (this.state.isGuessLost || this.state.isGuessWon) {
            endGameModal = <EndGuessModal
                date={this.state.gameDate}
                pokemon={this.state.currentPokemon}
                listLetter={this.state.listSubmitLetter}
                isGameWon={this.state.isGuessWon}>
            </EndGuessModal>
        }

        return <section className='d-flex flex-column align-items-center'>
            <article className="position-relative mb-3 px-2">
                <PokemonRender
                    ref={this.pokemonRenderRef}
                    animate={this.animateRenderer}
                    pokemon={this.state.currentPokemon}
                    isRevealed={this.state.isGuessWon || this.state.isGuessLost}>
                </PokemonRender>
            </article>
            <div className="w-100 d-flex justify-content-evenly">
                <PlayerHealth
                    maxHealth={this.state.maxHealth}
                    health={this.state.health}>
                </PlayerHealth>
                <PokemonHealth
                    pokemon={this.state.currentPokemon}
                    letters={this.state.listSubmitLetter}
                    onHit={() => this.pokemonRenderRef.current.renderHit()}
                    onMiss={listMiss => {this.pokemonRenderRef.current.renderMiss(); this.handlePokemonMissed(listMiss);}}
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
        console.log(this.state);
        if (!this.mounted) {
            this.mounted = true;
            this.loadCurrentGameData(DateHelper.getTodayStamp());
            setTimeout(() => { this.animateRenderer = true });
        }
    }
    
    componentDidUpdate() {
        this.saveCurrentGameData();
        if ((this.state.isGuessWon || this.state.isGuessLost) && !this.state.isGameSaved) {
            this.saveEndingGameData();
            this.setState({ isGameSaved: true });
        } 
    }

    /**
     * Returns pokemon id based on today's date
     * @param {number} dateStamp
     * @returns {number}
     */
    getPokemonId(dateStamp) {
        const gameId = dateStamp % APP_CONFIG.game.maxPokeId;
        let pokeId = 1;
        const n = parseInt(process.env.REACT_APP_GAME_CONFIG_ENCRYPT_FACTOR, 10);
        const e = parseInt(process.env.REACT_APP_GAME_CONFIG_ENCRYPT_MODULE, 10);
        for (let i = 1; i < gameId; i++) {
            pokeId *= e;
            pokeId %= n;
        }
        pokeId = 1 + Math.round(pokeId / process.env.REACT_APP_GAME_CONFIG_ENCRYPT_MODULE * (APP_CONFIG.game.maxPokeId - 1));
        return pokeId;
    }

    /**
     * Loads current game data
     * - Tries to retrieve today's game data from localStorage
     * - If nothing found or if the game is outdated, create a new game 
     */
    loadCurrentGameData(dateStamp) {
        const dateString = DateHelper.getStringFromStamp(dateStamp);
        let game = Storage.getCurrentGame();
        if (!game || game.date !== dateString) {
            game = {
                date: dateString,
                pokeId: this.getPokemonId(dateStamp),
                playedLetters: [],
                isCompleted: false
            };
            Storage.setCurrentGame(game);
        }
        PokeApi.getPokemon(game.pokeId).then( poke => {
            this.setState({
                gameDate: game.date,
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
            date: this.state.gameDate,
            pokeId: this.state.currentPokemon.id,
            playedLetters: this.state.listSubmitLetter,
            isCompleted: this.state.isGuessWon || this.state.isGuessLost
        });
    }

    /**
     * Save user game data after game end
     */
    saveEndingGameData() {
        let userStats = Storage.getUserStats();
        userStats.listGame.push({
            date: this.state.gameDate,
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
}