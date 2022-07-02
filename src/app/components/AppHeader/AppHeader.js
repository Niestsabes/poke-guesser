import React from "react";
import './AppHeader.scss';

export default class AppHeader extends React.Component {

    render() {
        return <header className="App-header">
            <menu className="App-header-menu">
                <button className="Button-header">
                    <span className="icon-github-brands" aria-label="GitHub"></span>
                </button>
                <button className="Button-header">
                    <span className="icon-chart-simple-solid" aria-label="Stats"></span>
                </button>
                <h1 className="App-title">PokéGuesser</h1>
                <button className="Button-header">
                    <span className="icon-question-solid" aria-label="Help"></span>
                </button>
                <button className="Button-header">
                    <span className="icon-gear-solid" aria-label="Settings"></span>
                </button>
            </menu>
        </header>
    }

}