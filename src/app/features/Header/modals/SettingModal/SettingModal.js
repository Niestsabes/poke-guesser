import React from "react";
import { Button, Modal, ModalHeader, ModalBody, Form } from "react-bootstrap";
import { Translation as T, Trans } from 'react-i18next';
import Storage from "../../../../services/Storage.service";
import APP_CONFIG from "../../../../../config/config";
import i18n from './../../../../../i18n';

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
        i18n.changeLanguage(this.state.userConfig.language);
        this.handleChangeKeyboard = this.handleChangeKeyboard.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    }

    render() {
        return <Modal show={this.state.isModalOpen}
            aria-labelledby="setting-modal-title"
            centered>
            <ModalHeader>
                <h2 className="modal-title" id="setting-modal-title"><T>{ t => t('config') }</T></h2>
                <Button type="button" variant="secondary" aria-label="Close" className="btn-icon mx-0"
                    onClick={() => this.setState({ isModalOpen: false })}>
                    <span aria-hidden="true" className="icon-times"></span>
                </Button>
            </ModalHeader>
            <ModalBody>
                <Form id="setting-section">
                    <h3 className="modal-subtitle"><T>{ t => t('settings') }</T></h3>
                    <Form.Group className="form-group" controlId="language">
                        <Form.Label><T>{ t => t('language') }</T></Form.Label>
                        <Form.Select aria-label="Language selection"
                            value={this.state.userConfig.language}
                            onChange={this.handleChangeLanguage}>{
                            Object.keys(APP_CONFIG.listAvailableLanguage).map(langKey => {
                                return <option aria-label={APP_CONFIG.listAvailableLanguage[langKey]}
                                    value={langKey} key={`language-select-${langKey}`}>
                                        {APP_CONFIG.listAvailableLanguage[langKey].name}
                                </option>
                            })
                        }</Form.Select>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="keyboard">
                        <Form.Label><T>{ t => t('keyboard') }</T></Form.Label>
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
                    <h3 className="modal-subtitle"><T>{ t => t('credits') }</T></h3>
                    <p className="modal-paragraph"><T>{ t => t('developedBy') }</T></p>
                    <p className="modal-paragraph">
                        <Trans i18nKey="inspiredBy1">Concept inspired from Wordle (by <a href={APP_CONFIG.extUrl.twitter.joshWardle} target="_blank" rel="noreferrer">Josh Wardle</a>)</Trans>
                        <Trans i18nKey="inspiredBy2"> and the <a href={APP_CONFIG.extUrl.twitter.joshWardle} target="_blank" rel="noreferrer">Pokémon</a> video game series (by Game Freak).</Trans>
                    </p>
                    <p className="modal-paragraph">
                        <Trans i18nKey="dataRetrivedOn">Pokémon data retrieved on <a href={APP_CONFIG.extUrl.pokeApi} target="_blank" rel="noreferrer">PokéApi</a>.</Trans>
                    </p>
                    <p className="modal-paragraph">
                        <Trans i18nKey="openSource">PokeGuesser is an <a href={APP_CONFIG.extUrl.git} target="_blank" rel="noreferrer">open-source&nbsp;project</a>.</Trans>
                    </p>
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

    /**
     * @event (onChange) from language form select
     * @param {*} event 
     */
    handleChangeLanguage(event) {
        let conf = this.state.userConfig;
        conf.language = event.target.value;
        this.setState({ userConfig: conf });
        i18n.changeLanguage(conf.language);
        Storage.setUserConfig(conf);
    }
}