import React from "react";
import "./Keyboard.scss"

/**
 * @class Keyboard
 * @description Allow user to type letters
 * @property {char[]} usedLetters
 * @property {char} onKeyPress
 */
export default class Keyboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handleSubmit = this.handleKeyPressed.bind(this);
        this.handleDelete = this.handleKeyPressed.bind(this);
    }

    qwertyKeyboard = [
        ['Q', 'W', 'E', 'R', 'T','Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']
    ]

    render() {
        return <div className="Keyboard mb-2 px-2">
            { this.renderKeyboard(this.qwertyKeyboard) }
        </div>
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
                            return <button key={`keyboard-tile` + keyValue}
                                disabled={this.props.disabled}
                                className="Button-keyboard-large" 
                                onClick={this.handleSubmit}>
                                <span className="icon-right-to-bracket-solid"></span>
                            </button> }
                        case 'Back': { 
                            return <button key={`keyboard-tile` + keyValue}
                                disabled={this.props.disabled}
                                className="Button-keyboard-large"
                                onClick={this.handleDelete}>
                                <span className="icon-delete-left-solid"></span>
                            </button> }
                        default: { 
                            return <button key={`keyboard-tile` + keyValue}
                                className="Button-keyboard"
                                disabled={this.props.disabled 
                                    || (this.props.usedLetters
                                        && this.props.usedLetters.includes(keyValue))}
                                onClick={() => this.handleKeyPressed(keyValue)}>
                                { keyValue }
                            </button> }
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