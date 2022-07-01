import React from "react";
import PokemonApi from '../../../api/pokemon.api';
import RandomPokemon from "../../components/RandomPokemon/RandomPokemon";
import AnswerTextInput from "../../components/AsnwerTextInput/AnswerTextInput";

export default class PokemonGuesser extends React.Component {

    /** @property {PokemonApi} */
    pokeApi;
    /** @property {boolean} */
    mounted = false;

    constructor(props) {
        super(props);
        this.pokeApi = new PokemonApi();
        this.state = {
            currentPokemon: null,
            isRevealed: false
        };
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    render() {
        return <section className='d-flex flex-column align-items-center'>
            <RandomPokemon
                pokemon={this.state.currentPokemon} 
                reveal={this.state.isRevealed}>
            </RandomPokemon>
            <AnswerTextInput onAnswer={this.handleAnswer}></AnswerTextInput>
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
     * @event onSubmit
     * @param {string} answer 
     */
    handleAnswer(answer) {
        if (this.state && this.state.currentPokemon) {
            this.setState({ isRevealed: true });
        }
        
    }

}