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
                        typingSpeed={100}
                        onComplete={() => setStep(2)}
                        
                        />
                    )}
                </div>
                {/* Line 2 */}
                <div className='page__left--name'>
                    {step >= 2 && (
                        <Typewriter 
                            text="Michael Crowe" 
                            typingSpeed={90} 
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
                            typingSpeed={80} 
                            startDelay={1000}
                            onComplete={() => setStep(4)}
                        />
                    )}
                </div>
                
                {/* Step 4: The Scanning Line */}
                {step === 4 && (
                    <div className='page__left--scanning'>                    
                            <Typewriter 
                                text="Scanning Interests..." 
                                typingSpeed={80}
                                startDelay={1000}
                                onComplete={() => {
                                    // Wait 1 second after typing finishes, then show the list
                                    setTimeout(() => {
                                        setStep(5)
                                    }, 1800)
                                }} 
                            />
                        </div>
                )}

                {/* Step 5 the Results line */}
                {step === 5 && (
                    <div className='page__left--scanning'>
                        <Typewriter
                            text= "[OK] Scan Complete. Found 3 entries:  {Fetching Data...}"
                            typingSpeed={100}
                            startDelay={1000}
                            onComplete={() => {
                                setTimeout(() => {
                                    setStep(6)
                                },1000)
                            }}
                        />
                    </div>
                )}

                {/* Step 6: The Interests Lists */}
                <div className={`interests-container ${step >= 6 ? 'interests-container--visible' : ''}`}>
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
            </div>
        </main>
    )    
}

export default Home;