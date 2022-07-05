import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "react-bootstrap";
import ValueGauge from "../ValueGauge/ValueGauge";
import "./StatisticModal.scss";
import Storage from "../../services/Storage.service";
import APP_CONFIG from "../../../config/config";

/**
 * @class StatisticModal
 * @property {string} defaultKeyboard
 */
export default class StatisticModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userStats: Storage.getUserStats() };
        Storage.addListener('userStats', 'statisticModal', () => { this.setState({ userStats: Storage.getUserStats() }) })
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
                            <var className="statistic-figure-value">{this.state.userStats.listGame.length}</var>
                        </div>
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Win Rate</label>
                            <var className="statistic-figure-value">{this.computeWinRatio()}</var>
                        </div>
                    </div>
                    <div className="statistic-figure-line">
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Win Streck</label>
                            <var className="statistic-figure-value">{this.state.userStats.currentStreak}</var>
                        </div>
                        <div className="statistic-figure">
                            <label className="statistic-figure-label">Best Streck</label>
                            <var className="statistic-figure-value">{this.state.userStats.bestStreak}</var>
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

    componentWillUnmount() {
        Storage.removeListener('userStats', 'statisticModal');
    }

    show() {
        this.setState({ isModalOpen: true })
    }

    renderPerformance() {
        let perfs = {}
        for (let life = 0; life <= APP_CONFIG.game.maxLife; life++) {
            perfs[life] = this.state.userStats.listGame.filter(game => game.lifeCount === life).length;
        }
        
        let maxPerfValue = Object.values(perfs).sort((a, b) => b - a)[0];
        if (maxPerfValue < 1) { maxPerfValue = 1; }
        return Object.keys(perfs).sort((a, b) => b - a).map(remainLives => {
            return <div className="statistic-performance-line" key={`perf-line-${remainLives}`}>
                <label className="statistic-performance-label">{
                    remainLives > 0 ?
                        <span>{remainLives} <span className="icon-heart-solid icon-small text-danger"></span></span> : 
                        <span className="icon-skull-solid"></span>
                }</label>
                <ValueGauge maxValue={maxPerfValue} value={perfs[remainLives]}></ValueGauge>
            </div>
        });
    }

    /**
     * Compute win rate based on user game stats
     * @returns {string}
     */
    computeWinRatio() {
        const countGame = this.state.userStats.listGame.length;
        const countWin = this.state.userStats.listGame.filter(game => game.isWon).length;
        return countGame > 0 ? Math.round(countWin * 100 / countGame) + '%' : '-';
    }
}