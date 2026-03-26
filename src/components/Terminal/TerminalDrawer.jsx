import React from 'react';
import Terminal from './Terminal';

const TerminalDrawer = ({setIsAdmin, isOpen, onClose, onOpen}) => {
    return (
        <aside className={`terminal-drawer ${isOpen ? 'terminal-drawer--is-open' : ''}`}>
            <Terminal
                onOpen={onOpen}
                onClose={onClose}
                setIsAdmin={(setIsAdmin)}
            />
        </aside>
    );
};

export default TerminalDrawer;