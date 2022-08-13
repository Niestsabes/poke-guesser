import React from "react";
import { Trans as T } from 'react-i18next';
import './AppFooter.scss';

export default class AppFooter extends React.Component {

    render() {
        return <footer className="App-footer">
            <T i18nKey="footer">Game developed by Sébastien Cayet - Based on PokeApi</T>
        </footer>
    }

}