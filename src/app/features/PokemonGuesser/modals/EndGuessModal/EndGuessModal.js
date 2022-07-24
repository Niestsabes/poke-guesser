import React from "react";
import APP_CONFIG from "../../../../../config/config";
import { Button, Modal, ModalHeader, ModalBody } from "react-bootstrap";
import "./EndGuessModal.scss";

/**
 * @class EndGuessModal
 * @property {object} pokemon
 * @property {char[]} listLetter
 * @property {boolean} isGameWon
 */
export default class EndGuessModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: true,
            shareBtnText: 'Share'
        };
    }

    render() {
        return <Modal show={this.state.isModalOpen}
            aria-labelledby="end-game-modal-title"
            centered>
            <ModalHeader>
                <h2 className="modal-title" id="#end-game-modal-title">
                    {this.props.isGameWon ? 'You Win!' : 'You Lose...'}
                </h2>
                <Button type="button" variant="secondary"aria-label="Close" className="btn-icon mx-0"
                    onClick={() => this.setState({ isModalOpen: false })}>
                    <span aria-hidden="true" className="icon-times"></span>
                </Button>
            </ModalHeader>
            <ModalBody> 
                <p>
                    {this.props.isGameWon ? 
                        'Congratulations, you have caught this Pokémon!' :
                        'Oh no, the Pokemon ran away!'}<br/>
                    Come back tomorrow to discover a new wild Pokémon.
                </p>
                <h3 className="modal-subtitle">Summary{this.renderPokemonName(this.props.pokemon)}</h3>
                <div className="summary-table-wrapper">
                    <img className="summary-table-image"
                        src={this.props.pokemon ? this.props.pokemon.image : ''}
                        alt="Pokemon">
                    </img>
                    <table>
                        <thead>{this.renderLetterRow(this.props.listLetter)}</thead>
                        <tbody>{this.renderLetterMatchRow(this.props.pokemon, this.props.listLetter)}</tbody>
                    </table>
                </div>
                <menu className="p-0 m-0">
                    <a href={APP_CONFIG.extUrl.pokedex + this.props.pokemon.name} target="_blank" rel="noreferrer">
                        <Button className="btn-secondary" type="button" aria-label="View pokemon in pokedex">
                            <span className="icon-search-solid mx-1"></span>
                            <span className="mx-1">View in Pokedex</span>
                        </Button>
                    </a>
                    <Button type="button" aria-label="Share game summary"
                        onClick={() => { this.handleShareSummary(this.props.pokemon, this.props.listLetter)}}>
                        <span className="icon-share-nodes-solid mx-1"></span>
                        <span className="mx-1">{ this.state.shareBtnText }</span>
                    </Button>
                </menu>
            </ModalBody>
        </Modal>
    }

    /**
     * Renders Pokemon's name
     * @param {object} pokemon 
     * @returns {string}
     */
    renderPokemonName(pokemon) {
        return pokemon && pokemon.name ? ' - ' + pokemon.name.toUpperCase() : '';
    }

    /**
     * Renders letters used during the game in table row
     * @param {object} pokemon 
     * @param {char[]} listLetter 
     * @returns {JSX}
     */
    renderLetterRow(listLetter) {
        let listElem = null;
        if (listLetter) {
            listElem = listLetter.map((letter, idx) => {
                return <td key={`summary-table-cell-h${idx}`} className="summary-table-cell">{ letter }</td>
            });
        }
        return <tr>{listElem}</tr>;
    }

    /**
     * Renders matches between given letters and pokemon name
     * @param {object} pokemon 
     * @param {char[]} listLetter
     * @returns {JSX}
     */
    renderLetterMatchRow(pokemon, listLetter) {
        let listElem = null;
        if (pokemon && pokemon.name && listLetter) {
            listElem = listLetter.map((letter, idx) => {
                const iconClass = pokemon.name.toUpperCase().includes(letter) ?
                    'icon-check text-success' :
                    'icon-heart-crack-solid text-danger';
                return <td key={`summary-table-cell-b${idx}`} className="summary-table-cell">
                    <span className={iconClass}></span>
                </td>
            });
        }
        return <tr>{listElem}</tr>
    }

    /**
     * Copies current game's summary in clipboard
     * @param {object} pokemon 
     * @param {string[]} listLetter
     * @returns {string}
     */
    handleShareSummary(pokemon, listLetter) {
        if (pokemon && pokemon.name && listLetter) {
            const isWin = listLetter.filter(letter => !pokemon.name.toUpperCase().includes(letter)).length < APP_CONFIG.game.maxLife;
            const title = `${APP_CONFIG.app.name} (@${APP_CONFIG.app.name}) - ${this.props.date}\n`;
            const mgs = isWin ? 'Pokémon Caught!' : 'Pokémon ran away...';
            const attempts = listLetter.map(letter => pokemon.name.toUpperCase().includes(letter) ? '✅' : '💔').join(' ') + '\n';
            const url = `${process.env.REACT_APP_URL}`;
            navigator.clipboard.writeText([title, mgs, attempts, url].join('\n'));

            this.setState({ shareBtnText: 'Copied!' });
            setTimeout(() => { this.setState({ shareBtnText: 'Share' }); }, 7000);
        }
        else {
            throw new Error('Cannot copy summary to clipboard has pokemon of letters have not been provided.')
        }
    }
}