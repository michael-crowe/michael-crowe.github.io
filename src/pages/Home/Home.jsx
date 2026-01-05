import React, { useState, useEffect } from 'react'

//import scss file
import '/src/assets/styles/pages/_home.scss';
import myLogo from '/src/assets/images/mike_logo.png'
import Typewriter from '/src/components/Typewriter/Typewriter'


const Home = () => {
    //State to control the sequence
    const [step, setStep] = useState(1);

    return (
        <main className="page">
            <div className='page__left'>

                {/* Line 1 */}
                <div className='page__left--intro'>
                    {step >= 1 && (
                        <Typewriter
                        text="_hi my name is" 
                        delay={100}
                        onComplete={() => setStep(2)}
                        
                        />
                    )}
                </div>
                {/* Line 2 */}
                <div className='page__left--header'>
                    {step >= 2 && (
                        <Typewriter 
                            text="Michael Crowe" 
                            delay={90} 
                            startDelay={700}
                            onComplete={() => setStep(3)}
                        />
                    )}
                </div>
                {/* Line 3 */}
                <div className='page__left--title'>
                    {step >= 3 && (
                        <Typewriter
                        className=""
                            text="[Cyber Security Professional] && [Junior Developer]" 
                            delay={80} 
                            startDelay={1000}
                            onComplete={() => setStep(4)}
                        />
                    )}
                </div>

                {/* Step 4: The Scanning Line */}
                {step === 4 && (
                    <div className='page__left--intro'>
                        <Typewriter 
                            text="Scanning Interests..." 
                            delay={80}
                            startDelay={1000}
                            onComplete={() => {
                                // Wait 1 second after typing finishes, then show the list
                                setTimeout(() => {
                                    setStep(5);
                                }, 1200)
                            }} 
                        />
                    </div>
                )}

                {/* Step 5: The Final List */}
                <div className={`interests-container ${step >= 5 ? 'interests-container--visible' : ''}`}>
                    <div className='page__left--details'>
                        <p className='terminal-prompt'>
                            <span className='success-text'>[ OK ]</span> Scan Complete. Found 3 entries:
                        </p>
                        <p>├── Interests/ </p>
                        <ul className='page__left--no-buttlet-list'>
                            <li className='page__left--link-item'>├── Cyber Security</li>
                            <li className='page__left--link-item'>├── Web Development</li>
                            <li className='page__left--link-item'>└── AI Development & Engineering (Learning)</li>
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
            </div>


        </main>
    )    
}

export default Home;