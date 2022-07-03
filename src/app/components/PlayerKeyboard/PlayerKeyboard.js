import React from "react";
import Settings from "../../services/config.service";
import { Button } from "react-bootstrap";
import "./PlayerKeyboard.scss"

/**
 * @class Keyboard
 * @description Allow user to type letters
 * @property {char[]} usedLetters
 * @property {char} onKeyPress
 */
export default class PlayerKeyboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { keyboard: Settings.getKeyboard() };
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handleSubmit = this.handleKeyPressed.bind(this);
        this.handleDelete = this.handleKeyPressed.bind(this);
    }
    
    render() {
        return <div className="Keyboard mb-2 px-2">
            { this.renderKeyboard(this.state.keyboard) }
        </div>
    }

    componentDidMount() {
        Settings.addListener('playerKeyboard', () => this.setState({ keyboard: Settings.getKeyboard() }));
    }

    componentWillUnmount() {
        Settings.removeListener('playerKeyboard');
    }

    /**
     * Render keyboard JSX elements
     * @param {char[][]} keyboardConfig
     * @returns {JSX}
     */
    renderKeyboard(keyboardConfig) {    
        return keyboardConfig.map((line, idx) => { 
            return <div key={`keyboard-line-${idx}`} className="Keyboard-line">
                {line.map(keyValue => {
                    switch (keyValue) {
                        case 'Enter': { 
                            return <Button key={`keyboard-tile` + keyValue}
                                variant="secondary"
                                disabled={this.props.disabled}
                                className="Button-keyboard-large" 
                                onClick={this.handleSubmit}>
                                <span className="icon-right-to-bracket-solid"></span>
                            </Button> }
                        case 'Back': { 
                            return <Button key={`keyboard-tile` + keyValue}
                                variant="secondary"
                                disabled={this.props.disabled}
                                className="Button-keyboard-large"
                                onClick={this.handleDelete}>
                                <span className="icon-delete-left-solid"></span>
                            </Button> }
                        default: { 
                            return <Button key={`keyboard-tile` + keyValue}
                                variant="secondary"
                                className="Button-keyboard"
                                disabled={this.props.disabled 
                                    || (this.props.usedLetters
                                        && this.props.usedLetters.includes(keyValue))}
                                onClick={() => this.handleKeyPressed(keyValue)}>
                                { keyValue }
                            </Button> }
                    }
                })}
            </div> 
        });
    }

    /**
     * @event (click) on keyboard letter
     * @emits (onKeyPress)
     */
    handleKeyPressed(keyValue) {
        this.props.onKeyPress(keyValue);
    }

    /**
     * @event (click) on submit key
     */
    handleSubmit() {}

    /**
     * @event (click) on delete key
     */
    handleDelete() {}
}