import React from "react";
import "./PokemonHit.scss";

/**
 * @class PokemonHit
 */
export default class PokemonHit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasSize: 200
        }
    }

    render() {
        return <canvas id="pokemon-hit-canvas"
            className="pokemon-hit-canvas"
            width={this.state.canvasSize}
            height={this.state.canvasSize}>
        </canvas>;
    }

    async renderHit() {
        const nbFrame = 16;
        for (let i = 0; i <= nbFrame + 1; i++) {
            await this.renderHitFrame(i / nbFrame);
        }
    }

    renderHitFrame(frame) {
        const canvas = document.getElementById("pokemon-hit-canvas");
        const ctx = canvas.getContext("2d");
        const size = this.state.canvasSize;
        const middle = this.state.canvasSize / 2;
        const nbStroke = 12;
        const minStrokeRadius = 10;
        const maxStrokeRadius = 80;

        return new Promise(resolve => {
            ctx.clearRect(0,0,size,size);
            if (frame >= 0 && frame <= 1) {
                ctx.lineWidth = 5;
                ctx.lineCap = "round";
                ctx.strokeStyle = 'rgb(203, 67, 131)';
                for (let i = 0; i < nbStroke; i++){
                    ctx.beginPath();
                    ctx.moveTo(
                        middle + (minStrokeRadius + (maxStrokeRadius - minStrokeRadius) * Math.pow(frame, 2)) * Math.cos(Math.PI * 2 * i / nbStroke),
                        middle + (minStrokeRadius + (maxStrokeRadius - minStrokeRadius) * Math.pow(frame, 2)) * Math.sin(Math.PI * 2 * i / nbStroke)
                    );
                    ctx.lineTo(
                        middle + (minStrokeRadius + (maxStrokeRadius - minStrokeRadius) * Math.pow(frame, 0.5)) * Math.cos(Math.PI * 2 * i / nbStroke),
                        middle + (minStrokeRadius + (maxStrokeRadius - minStrokeRadius) * Math.pow(frame, 0.5)) * Math.sin(Math.PI * 2 * i / nbStroke)
                    );
                    ctx.stroke();
                }
            }
            ctx.save();
            setTimeout(() => resolve(), 20);
        });
    }
}