import React from "react";
import "./PokemonHealth.scss";

/**
 * @class PokemonHealth
 * @description Display Pokémon name and health
 * @property {object} pokemon
 * @property {char[]} letters
 * @property {char} onMiss
 * @property {char} onHit
 * @property {object} onDiscovered
 */
export default class PokemonHealth extends React.Component {

    constructor(props) {
        super(props);
        this.state = { discovered: false };
    }

    render() {
        return <article className="Pokemon-name px-2" aria-label={`Pokemon name: try it`}>
            <strong>{this.renderPokemonName(this.props.pokemon)}</strong>
        </article>
    }

    componentDidUpdate(prevProps) {
        if (prevProps.letters !== this.props.letters && this.props.pokemon) {
            this.checkLetterMisses(prevProps.letters, this.props.letters, this.props.pokemon);
            if (!this.state.discovered) {
                this.checkDiscovered(this.props.pokemon, this.props.letters);
            }
        }
    }

    /**
     * Return displayed Pokemon's name. Hide A-Z letters that have not been submitted yet.
     * @param {object} pokemon 
     * @returns {string}
     */
    renderPokemonName(pokemon) {
        let render = '';
        if (pokemon && pokemon.name) {
            const joinLetter = this.props.letters.join('');
            const regexp = new RegExp('[^' + joinLetter.toUpperCase() + joinLetter.toLowerCase() + ']', 'g');
            render = pokemon.name.replace(regexp, '_ ').trim().replace(/' '/g, '\u00A0');
        }
        return render;
    }

    /**
     * Check that new letters are in pokemon's name. Otherwise, trigger a miss.
     * @event (propChange) on letters property change
     * @param {char[]} listPrevLetters 
     * @param {char[]} listNewLetters 
     * @param {object} pokemon
     * @emits (onMiss) if changed letter in not included in Pokemon's name
     * @returns {boolean}
     */
    checkLetterMisses(listPrevLetters, listNewLetters, pokemon) {
        const listNewLetter = listNewLetters.filter(ltr => listPrevLetters.findIndex(prvLtr => prvLtr === ltr) < 0);
        const listMissLetter = listNewLetter.filter(ltr => !pokemon.name.toUpperCase().includes(ltr.toUpperCase()));
        if (listMissLetter.length > 0) {
            this.props.onMiss(listMissLetter);
        }
        if (listMissLetter.length < listNewLetter.length) {
            this.props.onHit(listNewLetter.filter(letter => !listMissLetter.includes(letter)));
        }
        return listMissLetter.length > 0;
    }

    /**
     * Check that the Pokemon has been discovered, i.e. its whole name has been revealed
     * @param {object} pokemon
     * @param {char[]} listLetter
     * @returns {boolean}
     */
    checkDiscovered(pokemon, listLetter) {
        const joinLetter = listLetter.join('');
        const regexp = new RegExp('[' + joinLetter.toUpperCase() + joinLetter.toLowerCase() + ']', 'g');
        const remaining = pokemon.name.replace(regexp, '');
        const isDiscovered = !remaining.match(/[A-Za-z]/g);
        if (isDiscovered) {
            this.setState({ discovered: true });
            this.props.onDiscovered(pokemon);
        }
        return isDiscovered;
    }
}