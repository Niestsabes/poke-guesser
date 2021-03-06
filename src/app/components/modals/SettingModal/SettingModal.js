import React from "react";
import Storage from "../../../services/Storage.service";
import APP_CONFIG from "../../../../config/config";
import { Button, Modal, ModalHeader, ModalBody, Form } from "react-bootstrap";

/**
 * @class SettingModal
 */
export default class SettingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userConfig: Storage.getUserConfig(),
            isModalOpen: false
        };
        this.handleChangeKeyboard = this.handleChangeKeyboard.bind(this);
    }

    render() {
        return <Modal show={this.state.isModalOpen}
            aria-labelledby="setting-modal-title"
            centered>
            <ModalHeader>
                <h2 className="modal-title" id="setting-modal-title">Config</h2>
                <Button type="button" variant="secondary" aria-label="Close" className="btn-icon mx-0"
                    onClick={() => this.setState({ isModalOpen: false })}>
                    <span aria-hidden="true" className="icon-times"></span>
                </Button>
            </ModalHeader>
            <ModalBody>
                <Form id="setting-section">
                    <h3 className="modal-subtitle">Settings</h3>
                    <Form.Group className="form-group" controlId="keyboard">
                        <Form.Label>Keyboard</Form.Label>
                        <Form.Select aria-label="Keyboard selection"
                            value={this.state.userConfig.keyboard}
                            onChange={this.handleChangeKeyboard}>{
                            Object.keys(APP_CONFIG.keyboard).map(name => {
                                return <option aria-label={name} value={name} key={`keyboard-select-${name}`}>{name.toUpperCase()}</option>
                            })
                        }</Form.Select>
                    </Form.Group>
                </Form>
                <article id="credit-section">
                    <h3 className="modal-subtitle">Credits</h3>
                    <p className="modal-paragraph">Game developed by S??bastien Cayet.</p>
                    <p className="modal-paragraph">Concept inspired from Wordle
                        (by <a href={APP_CONFIG.extUrl.twitter.joshWardle} target="_blank" rel="noreferrer">Josh&nbsp;Wardle</a>) and
                        the <a href={APP_CONFIG.extUrl.twitter.joshWardle} target="_blank" rel="noreferrer">Pok??mon</a> video game series (by Game Freak).</p>
                    <p className="modal-paragraph">Pok??mon data retrieved on <a href={APP_CONFIG.extUrl.pokeApi} target="_blank" rel="noreferrer">Pok??Api</a>.</p>
                    <p className="modal-paragraph">PokeGuesser is an <a href={APP_CONFIG.extUrl.git} target="_blank" rel="noreferrer">open-source&nbsp;project</a>.</p>
                </article>
            </ModalBody>
        </Modal>
    }

    show() {
        this.setState({ isModalOpen: true })
    }

    /**
     * @event (onChange) from keyboard form select
     * @param {*} event 
     */
    handleChangeKeyboard(event) {
        let conf = this.state.userConfig;
        conf.keyboard = event.target.value;
        this.setState({ userConfig: conf });
        Storage.setUserConfig(conf);
    }
}