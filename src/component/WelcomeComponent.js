import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo.gif';

export default function() {
    const history = useHistory();

    useEffect( () => {
            document.addEventListener('keypress', handleKeyPressed, true)
        }, () => {
            document.removeEventListener('keypress', handleKeyPressed, true);
        }
    );

    const handleKeyPressed = () => {
        history.push('/setup');
    };

    return (<div className="App">
        <header className="App-header">
            <p>
                Welcome to MineSweeper
            </p>
            <img src={logo} className="App-logo" alt="logo" />
            <a
                className="App-link"
                href="https://github.com/shayco37"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
            >
                Press any key to continue ...
            </a>
        </header>
    </div>);
};
