import React from 'react'
import { TERMINAL_PATHS } from '../../constants/terminalIcons'
import './_terminal.scss'

const TerminalIcon = ({ path }) => (
    <svg viewBox="0 0 24 24" xmls="">
        <path d={path} fill="currentColor"/>
    </svg>
)

const Terminal = ({children, title="michael@cyber-dev"}) => {
    return (
        <div className='terminal'>

            {/*Top bar with windows-style contols */}
            <div className='terminal__header'>
                <div className='terminal__dots'>
                    <div className='terminal__dot terminal__dot--red'>
                        <TerminalIcon path={TERMINAL_PATHS.CLOSE} />
                    </div>
                    <div className='terminal__dot terminal__dot--yellow'>
                        <TerminalIcon path={TERMINAL_PATHS.MAXIMIZE} />
                    </div>
                    <div className='terminal__dot terminal__dot--green'>
                        <TerminalIcon path={TERMINAL_PATHS.MINIMIZE} />
                    </div>
                </div>
                <span className='terminal__title'>michael@cyber-dev</span>
            </div>

            {/*Content Area */}
            <div className='terminal__body'>
                {children}
            </div> 
        </div>
    );
};


export default Terminal