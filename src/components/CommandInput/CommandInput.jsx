import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import "/src/assets/styles/components/_commandInput.scss"

const CommandInput = () => {
    const [input, setInput ] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleCommand = (e) => {
        if (e.key == 'Enter') {
            const command = input.toLowerCase().trim();

            //Logic for navigation based on user input
            switch (command) {
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
                    console.log('list out directories')
                    break;
                case 'whoami':
                    console.log('print guest@crowe-terminal');
                    break;
                case 'pwd':
                    console.log('print current URL')
                    break;
                case 'root':
                    console.log('have some kind of red alert display')
                    break;
                default:
                    console.log('Use --help for information')
                    break;
            }
            setInput('') // Reset input after command
        }
    };

    return (
        <div className='command-bar'>
            <div className='command-bar__prompt'>
                <span className='command-bar__user'>guest@crowe-terminal:</span>
                <span className='command-bar__path'>~</span>
                <span className='command-bar__symbol'>$</span>
            </div>
            <input
                className='command-bar__input' 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder='_'
                autoFocus
                autoComplete='off'
                spellCheck='false'
            />
        </div>
    );
};

export default CommandInput