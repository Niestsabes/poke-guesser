import React from "react";
import { Button } from "react-bootstrap";
import './AppHeader.scss';

export default class AppHeader extends React.Component {

    render() {
        return <header className="App-header">
            <menu className="App-header-menu">
                <Button variant="secondary" className="btn-icon">
                    <span className="icon-github-brands" aria-label="GitHub"></span>
                </Button>
                <Button variant="secondary" className="btn-icon">
                    <span className="icon-chart-simple-solid" aria-label="Stats"></span>
                </Button>
                <h1 className="App-title">PokéGuesser</h1>
                <Button variant="secondary" className="btn-icon">
                    <span className="icon-question-solid" aria-label="Help"></span>
                </Button>
                <Button variant="secondary" className="btn-icon">
                    <span className="icon-gear-solid" aria-label="Settings"></span>
                </Button>
            </menu>
        </header>
    }

}