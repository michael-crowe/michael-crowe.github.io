import React, { useState, useEffect } from 'react'

import '/src/assets/styles/pages/_home.scss';
import myLogo from '/src/assets/images/mike_logo.png'
import Typewriter from '/src/components/Typewriter/Typewriter'


const Home = () => {
    const [step, setStep] = useState(1);


    const getTimestamp = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            return `[ ${hours}:${minutes}:${seconds} ]`;
        };

    return (
        <main className="page">

            <div className='page__left'>
                {/* Line 1 */}
            <div className='page__left--intro'>
                {step >= 1 && (
                    <> {/* Wrap multiple components in a fragment */}
                        {/* Component 1: Prints time stamp very fast */}
                        <Typewriter
                            text={getTimestamp()}
                            typingSpeed={60} // Fast burst for the timestamp
                            hideCursor={true}
                            onComplete={() => setTimeout(() => setStep(2), 1000)}
                        />
                        {/* Component 2: Prints the system message */}
                        {step >= 2 && (
                        <Typewriter
                            text=' [system_msg]: "Hello World" >> _hi, my name is'
                            typingSpeed={70} 
                            onComplete={() => setStep(3)}
                        />
                        )}
                    </>
                )}
            </div>

                {/* Line 3 */}
                <div className='page__left--name'>
                    {step >= 3 && (
                        <Typewriter 
                            text="Michael Crowe" 
                            typingSpeed={90} 
                            startDelay={700}
                            onComplete={() => setStep(4)}
                        />
                    )}
                </div>
                {/* Line 4 */}
                <div className='page__left--title'>
                    {step >= 4 && (
                        <Typewriter
                        className=""
                            text="[Cyber Security Professional] && [Junior Developer]" 
                            typingSpeed={80} 
                            startDelay={1000}
                            onComplete={() => setStep(5)}
                        />
                    )}
                </div>
                
                {/* Step 5: The Scanning Line */}
                {step === 5 && (
                    <div className='page__left--scanning'>                    
                            <Typewriter 
                                text="Scanning Interests..." 
                                typingSpeed={80}
                                startDelay={1000}
                                onComplete={() => {
                                    setTimeout(() => {
                                        setStep(6)
                                    }, 1800)
                                }} 
                            />
                        </div>
                )}

                {/* Step 6 the Results line */}
                {step === 6 && (
                    <div className='page__left--scanning'>
                        <Typewriter
                            text= "[OK] Scan Complete. Found 3 entries:  {Fetching Data...}"
                            typingSpeed={100}
                            startDelay={1000}
                            onComplete={() => {
                                setTimeout(() => {
                                    setStep(8)
                                },1000)
                            }}
                        />
                    </div>
                )}

                {/* Step 7: The Interests Lists */}
                <div className={`interests-container ${step >= 8 ? 'interests-container--visible' : ''}`}>
                    <div className='page__left--details'>
                        <p className='interests-container--visible-animation-0'>├── Interests/ </p>
                        <ul className='interests-list'>
                            <li className='interests-container--visible-animation-1'>├── Cyber Security</li>
                            <li className='interests-container--visible-animation-2'>├── Web Development</li>
                            <li className='interests-container--visible-animation-3'>└── AI Development & Engineering (Learning)</li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className='page__right'>
                    <img 
                        src= {myLogo}
                        alt="Cyber Dev Logo"
                        className='page__right--logo'
                    />

                    <div className='page__right--credits'>
                        <p>Engineered by <span className='highlight'>Human Intent</span></p>
                        <div className='divider'>//</div>
                        <p>Augmented by <span className='highlight'>Gemini AI</span></p>

                    </div>
            </div>
        </main>
    )    
}

export default Home;