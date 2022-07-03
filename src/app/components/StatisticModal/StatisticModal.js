import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "react-bootstrap";
import ValueGauge from "../ValueGauge/ValueGauge";
import "./StatisticModal.scss";

/**
 * @class StatisticModal
 * @property {string} defaultKeyboard
 */
export default class StatisticModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Modal show={this.state.isModalOpen}
            aria-labelledby="statistic-modal-title"
            centered>
            <ModalHeader>
                <h2 className="modal-title" id="statistic-modal-title">Statistics</h2>
                <Button type="button" variant="secondary" aria-label="Close" className="btn-icon mx-0"
                    onClick={() => this.setState({ isModalOpen: false })}>
                    <span aria-hidden="true" className="icon-times"></span>
                </Button>
            </ModalHeader>
            <ModalBody>
                <article id="figure-section" className="statistic-figure-wrapper">
                    <div className="statistic-figure-line">
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Games</label>
                            <var className="statistic-figure-value">4</var>
                        </div>
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Win Rate</label>
                            <var className="statistic-figure-value">4</var>
                        </div>
                    </div>
                    <div className="statistic-figure-line">
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Win Serie</label>
                            <var className="statistic-figure-value">4</var>
                        </div>
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Best Serie</label>
                            <var className="statistic-figure-value">4</var>
                        </div>
                    </div>
                </article>
                <h3 className="modal-subtitle">Performances</h3>
                <article id="performance-section" className="statistic-performance-wrapper">
                    {this.renderPerformance()}
                </article>
            </ModalBody>
        </Modal>
    }

    show() {
        this.setState({ isModalOpen: true })
    }

    renderPerformance(){
        const perfs = { 5:5, 4:3, 3:4, 2:7, 1:6, 0:1 };
        let maxPerfValue = Object.values(perfs).sort((a, b) => b - a)[0];
        if (maxPerfValue < 1) { maxPerfValue = 1; }
        return Object.keys(perfs).map(remainLives => {
            return <div className="statistic-performance-line" key={`perf-line-${remainLives}`}>
                <label className="statistic-performance-label">{remainLives}</label>
                <ValueGauge maxValue={maxPerfValue} value={perfs[remainLives]}></ValueGauge>
            </div>
        });
    }
}