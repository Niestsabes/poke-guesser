import React from "react";
import APP_CONFIG from "../../../config/config";
import { Button } from "react-bootstrap";
import HelpModal from "./modals/HelpModal/HelpModal";
import SettingModal from "./modals/SettingModal/SettingModal";
import StatisticModal from "./modals/StatisticModal/StatisticModal";
import './AppHeader.scss';

/**
 * @class AppHeader
 */
export default class AppHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.statisticModalRef = new React.createRef();
        this.helpModalRef = new React.createRef();
        this.settingModalRef = new React.createRef();
    }

    render() {
        return <header className="App-header">
            <menu className="App-header-menu">
                <a href={APP_CONFIG.extUrl.git} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="btn-icon" onClick={this.handleGitClick}>
                        <span className="icon-github-brands" aria-label="GitHub"></span>
                    </Button>
                </a>
                <Button variant="secondary" className="btn-icon" onClick={() => this.statisticModalRef.current.show()}>
                    <span className="icon-chart-simple-solid" aria-label="Statistics"></span>
                </Button>
                <h1 className="App-title">
                    P<img src={process.env.PUBLIC_URL + "/logo512.png"} alt=""/>keGuesser
                </h1>
                <Button variant="secondary" className="btn-icon" onClick={() => this.helpModalRef.current.show()}>
                    <span className="icon-question-solid" aria-label="Help"></span>
                </Button>
                <Button variant="secondary" className="btn-icon" onClick={() => this.settingModalRef.current.show()}>
                    <span className="icon-gear-solid" aria-label="Settings"></span>
                </Button>
            </menu>
            <StatisticModal ref={this.statisticModalRef}></StatisticModal>
            <HelpModal ref={this.helpModalRef}></HelpModal>
            <SettingModal ref={this.settingModalRef}></SettingModal>
        </header>
    }
}