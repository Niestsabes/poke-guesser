import React from "react";
import APP_CONFIG from "../../../config/config";
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
                <h2 className="modal-title" id="help-modal-title">How to play?</h2>
                <Button type="button" variant="secondary" aria-label="Close" className="btn-icon mx-0"
                    onClick={() => this.setState({ isModalOpen: false })}>
                    <span aria-hidden="true" className="icon-times"></span>
                </Button>
            </ModalHeader>
            <ModalBody>
                <p className="modal-paragraph">
                    This game mixes the concept of <a href={APP_CONFIG.extUrl.whosThatPokemon} target="_blank" rel="noreferrer">Who's&nbsp;that&nbsp;Pokémon?</a> with
                    an actual <a href={APP_CONFIG.extUrl.pokemonShowdown} target="_blank" rel="noreferrer">Pokémon&nbsp;Battle</a>.</p>
                <p className="modal-paragraph">Everyday, you will randomly encounter a wild Pokémon. You have 5 lives <span className="icon-heart-solid text-danger icon-small"></span> to guess who that Pokémon is.</p>
                <p className="modal-paragraph">
                    For each try, you propose a letter.
                    If that letter is contained in Pokemon's name, then all occurences of that letter are revealed.<br/>
                    However, if Pokémon's name does not contain that letter, you lose a life <span className="icon-heart-solid text-danger icon-small"></span>.
                </p>
                <p className="modal-paragraph"><strong>Fully reveal the name of the Pokémon before losing your lives <span className="icon-heart-solid text-danger icon-small"></span> to win.</strong></p>
            </ModalBody>
        </Modal>
    }

    show() {
        this.setState({ isModalOpen: true })
    }
}