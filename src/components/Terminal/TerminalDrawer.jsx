import React from 'react';
import Terminal from './Terminal';

const TerminalDrawer = ({ isOpen, onClose, onOpen}) => {
    return (
        <aside className={`terminal-drawer ${isOpen ? 'terminal-drawer--is-open' : ''}`}>
            <Terminal
                onOpen={onOpen}
                onClose={onClose} 
            />
        </aside>
    );
};

export default TerminalDrawer;