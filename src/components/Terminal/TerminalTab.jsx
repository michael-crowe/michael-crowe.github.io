import React from 'react';

const TerminalTab = ({ onClick, isOpen }) => {
    // if the terminal is open, we hide the tab so it doesn't over lap the drawer
    if (isOpen) return null;

    return (
        <button 
            className={`terminal-tab ${isOpen ? 'terminal-tab--hidden' : ''}`} 
            onClick={onClick}
            type="button"
            aria-label="Open Terminal"
            >
            TERMINAL_ACCESS
        </button>
    );
};


export default TerminalTab