import classNames from "classnames";
import React from "react";
import './RandomPokemon.scss';

export default class RandomPokemon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: props.pokemon,
            isRevealed: props.isRevealed
        };
    }

    render() {
        return <article className="mb-2 px-2">
            <div className="Pokemon-panel">
                <img className={classNames({
                        "Pokemon-image": true,
                        "Mysterious": this.state.isRevealed !== true
                    })}
                    src={this.state.pokemon ? this.state.pokemon.sprites.front_default : ''}
                    alt="Mysterious Pokémon"
                    draggable="false">
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