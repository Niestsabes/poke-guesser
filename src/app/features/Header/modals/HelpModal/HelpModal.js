import React from "react";
import { Trans as T } from 'react-i18next';
import APP_CONFIG from "../../../../../config/config";
import { Button, Modal, ModalHeader, ModalBody } from "react-bootstrap";

/**
 * @class HelpModal
 */
export default class HelpModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
    }

    render() {
        return <Modal show={this.state.isModalOpen}
            aria-labelledby="help-modal-title"
            centered>
            <ModalHeader>
                <h2 className="modal-title" id="help-modal-title"><T i18nKey="howToPlay">How to play?</T></h2>
                <Button type="button" variant="secondary" aria-label="Close" className="btn-icon mx-0"
                    onClick={() => this.setState({ isModalOpen: false })}>
                    <span aria-hidden="true" className="icon-times"></span>
                </Button>
            </ModalHeader>
            <ModalBody>
                <p className="modal-paragraph">
                    <T i18nKey="concept1">This game mixes the concept of <a href={APP_CONFIG.extUrl.whosThatPokemon} target="_blank" rel="noreferrer">Who's&nbsp;that&nbsp;Pokémon?</a></T>
                    <T i18nKey="concept2"> with an actual <a href={APP_CONFIG.extUrl.pokemonShowdown} target="_blank" rel="noreferrer">Pokémon&nbsp;Battle</a>.</T>
                </p>
                <p className="modal-paragraph">
                    <T i18nKey="concept3">Everyday, you will randomly encounter a wild Pokémon. You have 5 lives <span className="icon-heart-solid text-danger icon-small"></span> to guess who that Pokémon is.</T>
                </p>
                <p className="modal-paragraph">
                    <T i18nKey="concept4">For each try, you propose a letter. If that letter is contained in Pokemon's name, then all occurences of that letter are revealed.</T><br/>
                    <T i18nKey="concept5">However, if Pokémon's name does not contain that letter, you lose a life <span className="icon-heart-solid text-danger icon-small"></span>.</T>
                </p>
                <p className="modal-paragraph">
                    <strong><T i18nKey="concept6">Fully reveal the name of the Pokémon before losing your lives <span className="icon-heart-solid text-danger icon-small"></span> to win.</T></strong>
                </p>
            </ModalBody>
        </Modal>
    }

    show() {
        this.setState({ isModalOpen: true })
    }
}