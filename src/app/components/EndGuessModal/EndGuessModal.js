import React from "react";
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
        this.state = { isModalOpen: true };
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
                        src={this.props.pokemon ? this.props.pokemon.sprites.front_default : ''}
                        alt="Pokemon">
                    </img>
                    <table>
                        <thead>{this.renderLetterRow(this.props.listLetter)}</thead>
                        <tbody>{this.renderLetterMatchRow(this.props.pokemon, this.props.listLetter)}</tbody>
                    </table>
                </div>
                <Button type="button" aria-label="Share">
                    <span className="icon-share-nodes-solid mx-1"></span>
                    <span className="mx-1">Share</span>
                </Button>
            </ModalBody>
        </Modal>
    }

    componentDidMount() { }

    /**
     * Render Pokemon's name
     * @param {object} pokemon 
     * @returns {string}
     */
    renderPokemonName(pokemon) {
        return this.props.pokemon && this.props.pokemon.name ? ' - ' + this.props.pokemon.name.toUpperCase() : '';
    }

    /**
     * Render letters used during the game in table row
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
     * Render matches between given letters and pokemon name
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

}