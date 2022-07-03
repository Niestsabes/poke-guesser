import React from "react";

const MIN_FILL_RATE = 10;

/**
 * @class ValueGauge
 * @property {number} maxValue
 * @property {number} value
 */
export default class ValueGauge extends React.Component {

    constructor(props) {
        super(props);
        this.state = { fillRate: MIN_FILL_RATE };
    }

    render() {
        const rate = this.computeFillRate(this.props.value, this.props.maxValue);
        return <div className="gauge">
            <div className="gauge-background" style={{width: rate + '%'}}>
                {this.props.value}
            </div>
        </div>
    }

    /**
     * @param {number} value 
     * @param {number} maxValue
     * @returns {number}
     */
    computeFillRate(value, maxValue) {
        return Math.round((100 - MIN_FILL_RATE) * value / maxValue) + MIN_FILL_RATE;
    }
}