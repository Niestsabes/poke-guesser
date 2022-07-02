import React from "react";
import classnames from "classnames";
import "./PlayerHealth.scss";

/**
 * @class PlayerHealth
 * @description Display Player health
 * @property {number} maxHealth
 * @property {number} health
 */
export default class PlayerHealth extends React.Component {
    
    constructor(props) {
        super();
        this.state = {};
        this.props = props;
    }
    
    render() {
        let listHeart = [];
        for (let i = 0; i < this.props.maxHealth; i++) {
            listHeart.push(<span key={`player-heart-${i}`} className={classnames({
                'mx-1': true,
                'Player-heart icon-heart-solid': i < this.props.health,
                'Player-heart-cracked icon-heart-crack-solid': i >= this.props.health
            })}></span>);
        }
        return <article className="d-flex mb-2 px-2" aria-label={`Health: ${this.props.health} life points remaining`}>
            {listHeart}
        </article>;
    }
}