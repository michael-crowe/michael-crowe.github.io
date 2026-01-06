import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import "/src/assets/styles/components/_commandInput.scss"

const CommandInput = () => {
    const [input, setInput ] = useState('');
    const [history, setHistory] = useState([]); //stores previous commands
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const historyEndRef = useRef(null);
    
    const scrollToBottom = () => {
        historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleCommand = (e) => {

        if (e.key == 'Enter') {

            const commandText = input.trim();
            if(!commandText) return;

            let responseText = ""; // Initialize the response string
            const lowerCommand = commandText.toLowerCase();

            switch (lowerCommand) {
                case '1':
                case 'cd /home':
                case 'cd ~':
                    navigate('/')
                    break;
                case '2':
                case 'cd /archive':
                    navigate('/archive')
                    break;
                case '3':
                case 'cd /terminal':
                    navigate('/terminal')
                    break;
                case '--help':
                    console.log("Available: [1 | cd /home], [2 | cd/ archive], [3 | cd/ terminal], [click on each link]")
                    break;
                case 'ls':
                    console.log('list out directories');
                    break;
                case 'whoami':
                    console.log('print guest@crowe-terminal');
                    break;
                case 'pwd':
                    responseText = window.location.hash.replace('#', '') || "/home"
                    break;
                case 'root':
                    console.log('have some kind of red alert display');
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                default:
                    responseText = `Command not found: {commandText}. Type --help for info.`;
                    break;
            }

            setHistory((prev) => [...prev, { 
                command: commandText, 
                response:responseText 
            }]);

            setInput(''); // Reset input after command
        }
    };

    return (
        <section className='terminal-shell'>
            <div className='terminal-shell__history'>
                {history.map((entry, index) => (
                    <div key={index} className='history-group'>
                        <div className='history-line'>
                            <span className='prompt-label'>guest@crowe-terminal:~$</span>
                            <span className='history-text'>{entry.command}</span>
                        </div>
                        {entry.response && (
                            <div className='response-line'>{entry.response}</div>
                        )}
                    </div>
                ))}
                <div ref={historyEndRef} /> {/* Invisible anchor for scrolling */}
            </div>
            <div className='terminal-shell__input-container'>
                <span className='prompt-label'>guest@crowe-terminal:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className='active-input'
                    placeholder='_'
                    autoFocus
                    autoComplete='off'
                    spellCheck='false'
                />
            </div>
        </section>

    );
};

export default CommandInput