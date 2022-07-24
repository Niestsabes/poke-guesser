import classNames from "classnames";
import React from "react";
import PokemonHit from "../PokemonHit/PokemonHit";
import './PokemonRender.scss';

export default class PokemonRender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: props.pokemon,
            animate: props.animate,
            isRevealed: props.isRevealed,
            isTakingDamage: false,
            isDodging: false
        };
        this.hitRef = new React.createRef();
    }

    render() {
        return <div className="Pokemon-panel">
            <img id="pokemon-image" 
                className={classNames({
                    "Pokemon-image": true,
                    "Mysterious": this.state.isRevealed !== true,
                    "hit": this.state.isTakingDamage,
                    "miss": this.state.isDodging
                })}
                src={this.state.pokemon ? this.state.pokemon.image : ''}
                alt="Mysterious Pokémon"
                draggable="false">
            </img>
            <PokemonHit ref={this.hitRef}></PokemonHit>
        </div>
    }

    componentDidUpdate(prevProps) {
        for (const key of Object.keys(prevProps)) {
            if (prevProps[key] !== this.props[key]) {
                this.setState({ [key]: this.props[key] });
            }
        }
    }

    async renderHit() {
        if (!this.state.animate) { return; }
        return new Promise(async (resolve) => {
            await this.hitRef.current.renderHit();
            this.setState({ isTakingDamage: true });
            setTimeout(() => {
                this.setState({ isTakingDamage: false });
                resolve();
            }, 1000);
        });
    }
    
    async renderMiss() {
        if (!this.state.animate) { return; }
        return new Promise(async (resolve) => {
            this.setState({ isDodging: true });
            setTimeout(() => {
                this.setState({ isDodging: false });
                resolve();
            }, 400);
        });
    }
}