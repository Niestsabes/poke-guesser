import classNames from "classnames";
import React from "react";
import './RandomPokemon.css';

export default class RandomPokemon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: props.pokemon,
            reveal: props.reveal
        };
    }

    render() {
        return <article>
            <div className="Pokemon-panel">
                <img className={classNames({
                        "Pokemon-image": true,
                        "Mysterious": this.state.reveal !== true
                    })}
                    src={this.state.pokemon ? this.state.pokemon.sprites.front_default : ''}
                    alt="Mysterious Pokémon">
                </img>
            </div>
            { this.renderPokemonName() }
        </article>
    }

    componentDidUpdate(prevProps) {
        for (const key of Object.keys(prevProps)) {
            if (prevProps[key] !== this.props[key]) {
                this.setState({ [key]: this.props[key] });
            }
        }
    }

    renderPokemonName() {
        if (this.state.reveal && this.state.pokemon) {
            return <strong className="Pokemon-answer">{this.state.pokemon.name}</strong>;
        }
        return null;
    }
}