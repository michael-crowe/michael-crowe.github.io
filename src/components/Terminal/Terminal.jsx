import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './_terminal.scss'

const TerminalIcon = ({ TERMINAL_PATHS }) => (
    <svg viewBox="0 0 24 24" xmls="http://www.w3.org/2000/svg">
        <path d={TERMINAL_PATHS} fill="currentColor"/>
    </svg>
)



const Terminal = ({ onClose, onOpen, setIsAdmin }) => {

    

    const [history, setHistory] = useState(['Access Granted. Type "help" for commands']);
    const [input, setInput] = useState('');
    const bodyRef = useRef(null);
    const inputRef = useRef(null);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const navigate = useNavigate();

    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const toogleTerminal = () => setIsTerminalOpen(prev => !prev);


    //Setting the focus for the input
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    },[] //runs on mount

);
    //Optional and can comment out if you don't like it
    //This keeps the focus to force it back even if a user clicks away and back
    const handleBodyClick = () => {
        //This will make sure someone can still hightlight text
        if(window.getSelection().toString() === "" && inputRef.current) {
            inputRef.current.focus();
        }
    };

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
                    
                    //Open Temrinal with Ctrl + O
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

            const { ctrlKey, key } = e;

            //Tab Auto Completion
            const availableCommands = ['about', 'whoami', 'skills', 'contact', 'clear', 'exit', 'help'];
            
            const previousCommands = history
                    .filter(line => line.startsWith('$ '))
                    .map(line => line.replace('$ ', ''));

            //Up Arrow Key Navigation
            if (key === 'ArrowUp') {

                e.preventDefault();

                if(previousCommands.length > 0) {
                    //Using math to keep app from crashing if someone keeps pressing Up Arrow after they reached
                    //the very first command they typed.
                    const newIndex = Math.min(historyIndex + 1, previousCommands.length - 1);
                    setHistoryIndex(newIndex);
                    setInput(previousCommands[previousCommands.length - 1 - newIndex]);
                }
            } 
            
            else if (key === 'ArrowDown') {

                e.preventDefault();

                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    setInput(previousCommands[previousCommands.length - 1 - newIndex]);
                } else {
                    setHistoryIndex(-1);
                    setInput('');
                }
            }


            if(key === 'Tab') {
                e.preventDefault(); //stops the focus from the input using tab

                const currentInput = input.toLowerCase().trim();

                if(currentInput) {
                    const match = availableCommands.find(cmd => cmd.startsWith(currentInput));
                    if(match) {
                        setInput(match);
                    }
                }
                return;
            }

            //keyboard shortcuts and Enter key logic within the terminal
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
                            response = 'AVAILABLE COMMANDS: about, whoami, skills, contact, clear, exit';
                            break;
                        case 'about':
                            response = 'MICHAEL CROWE: ["CYBER SECURITY SPECIALIST", "CODER", "DEVELOPER"]';
                            break;
                        case 'contact':
                            response = 'No worries, I will reach out to you!';
                            break;
                        case 'skills':
                            response = 'TECH STACK: REACT, SCSS, NODE.JS, PROGRAMMING: PYTHON, JAVA';
                            break;
                        case 'whoami':
                            response = 'GUEST_USER@MICHAEL_CROWE_OS: ACCESS_LEVEL_0';
                            break;
                        case 'cat /etc/passwd':
                            response = "Silly bear, you can't do that!"
                            break;
                        case 'sudo cat /etc/passwd':
                            response = "QXJlbid0IHlvdSBjbGV2ZXIsIHNpbGx5IGJlYXIh";
                            break;
                        case 'clear':
                            setHistory([]);
                            return;
                        case 'exit':
                            setInput('')
                            setHistory([]);
                            onClose(); //Triggers the state change in App.jsx
                            break;
                        case '':
                            return; // Don't process empty inputs
                        case 'override':
                            response = 'SYSTEM OVERRIDE DETECTED...ACCESSING PROTECTED DATA...';
                            if (setIsAdmin) {
                                setIsAdmin(true);
                                localStorage.setItem('portfolio_admin', 'true');
                            } else {
                                console.error('setIsAdmin prop is missing in Terminal!');
                            }
                            break;
                        case 'lock':
                            response = 'SESSION TERMINATED. CLEARING LOGS.';
                            if (location.pathname === '/admin'){
                                navigate('/');
                            };
                            setIsAdmin(false);
                            localStorage.removeItem('portfolio_admin');
                            break;
                        default:
                            response = `COMMAND NOT RECOGNIZED: ${command}. Type 'HELP' FOR OPTIONS`;
                            break;
                    
                }
                setHistory(prev => [...prev, `$ ${input}`, response]);
                setInput('');
                setHistoryIndex(-1);
                break;
                
            default:
                break;
        }
    };

    return (
        <div className="terminal" onClick={handleBodyClick}> {/*Takeout onClick={handleBodyClick} to remove body click focus*/}
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
                        ref={inputRef} //Attaching the ref for the auto focus, remove if don't want
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