import React, { useEffect, useState, useRef } from 'react'
import { TERMINAL_PATHS } from '../../constants/terminalIcons'
import './_terminal.scss'

const TerminalIcon = ({ path }) => (
    <svg viewBox="0 0 24 24" xmls="http://www.w3.org/2000/svg">
        <path d={path} fill="currentColor"/>
    </svg>
)

const Terminal = ({ onClose, onOpen }) => {

    const [history, setHistory] = useState(['Access Granted. Type "help" for commands']);
    const [input, setInput] = useState('');
    const bodyRef = useRef(null);

    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const toogleTerminal = () => setIsTerminalOpen(prev => !prev);


    //Global Keyboard ShortCuts (These listen to the whole browswer window even if not click/focus in terminal)
    useEffect(() => {

        const handleGlobalKeyDown = (e) => {

            const { ctrlKey, key } = e; // Destructure for cleaner code

            switch (true) {

                    //Close Terminal with Escape key
                    case key === 'Escape':
                    case ctrlKey && key === '`':
                        e.preventDefault();
                        onClose();
                        break;
                    
                    case ctrlKey && key === 'o':
                        e.preventDefault();
                        onOpen();
                        break;

                    default:
                        break;        
                }
            };

            window.addEventListener('keydown', handleGlobalKeyDown);
            return () => window.removeEventListener('keydown', handleGlobalKeyDown);
        },[onClose, onOpen]); // Global listeners from App.jsx

        //Auto SCroll
        useEffect(() => {
            if(bodyRef.current) {
                bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
            }
        }, [history]);

        const handleCommand = (e) => {

            //Keyboard shortcuts that are NOT global and must be within the terminal

            const { ctrlKey, key } = e; //destructure 

            switch(true) {

                // Ctrl + L to clear the terminal
                case ctrlKey && key === 'l':
                    e.preventDefault();
                    setHistory([]);
                    setInput('');
                    break;

                //Commands from the terminal input

                case key === 'Enter' :
                    // set the input text to lower case to match the cases below
                    const command = input.toLowerCase().trim();
                    let response = '';

                    //Commands
                    switch (command) {
                        case 'help':
                            response = 'AVAILABLE COMMANDS: ABOUT, PROJECTS, SKILLS, CLEAR, CONTACT';
                            break;
                        case 'about':
                            response = 'MICHAEL CROWE: CYBER SECURITY SPECIALIST & FULL-STACK DEVELOPER.';
                            break;
                        case 'projects':
                            response = 'FETCHING RESOSITORIES...No Data Found...Coming Soon!';
                            break;
                        case 'skills':
                            response = 'TECH STACK: REACT, SCSS, NODE.JS, PROGRAMMING: PYTHON, JAVA';
                            break;
                        case 'whoami':
                            response = 'GUEST_USER@MICHAEL_CROWE_OS: ACCESS_LEVEL_0';
                            break;
                        case 'clear':
                            setHistory([]);
                            setInput('');
                            break;
                        case 'exit':
                            setInput('')
                            setHistory([]);
                            onClose(); //Triggers the state change in App.jsx
                            break;
                        case '':
                            break;
                        default:
                            response = `COMMAND NOT RECOGNIZED: ${command}. Type 'HELP' FOR OPTIONS`;
                            break;
                    
                }
                setHistory(prev => [...prev, `${input}`, response]);
                setInput('');
                break;
            default:
                break;
        }
    };

    return (
        <div className="terminal">
            <div className='terminal__header'>
                <div className='terminal__dots'>
                    <div className='terminal__dot terminal__dot--red' onClick={onClose}></div>
                    <div className='terminal__dot terminal__dot--yellow'onClick={onClose} title="Minimize"></div>
                    <div className='terminal__dot terminal__dot--green'></div>
                </div>
                <div className='terminal__title'>bash - 00x24</div>
            </div>
            <div className='terminal__body' ref={bodyRef}>
                {history.map((line, i) => (
                    <div 
                        key={i}
                        className='terminal__line'
                    >{line}
                    </div>
                ))}
                <div className='terminal__input-line'>
                    <span className='terminal__prompt-symbol'>$ </span>
                    <input
                        className='terminal__input'
                        spellCheck="false"
                        autoComplete="off"
                        inputMode='text'
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}                    
                    />
                </div>
            </div>
        </div>
    )
}

export default Terminal