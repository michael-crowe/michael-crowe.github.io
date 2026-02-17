import React, { useState } from "react";
import '/src/pages/About/About';
import logo from '/src/assets/images/mike_logo.png';
import TypeWriter from '/src/components/Typewriter/Typewriter';

const About = () => {
    const [step, setStep] = useState(1);

    const getTimeStamp = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `[ ${hours}:${minutes}:${seconds} ]`;

    };

    return (
        <main className="about">
            <section className="about__content">
                {/*Step 1 & 2: Timestamp & system message */}
                {step >= 1 && (
                    //To void double nesting of 'about__content' applied a fragment
                    <>
                        <TypeWriter
                            text={getTimeStamp()}
                            typingSpeed={60}
                            hideCursor={true}
                            onComplete={() => setTimeout(() => setStep(2), 1000)}
                        />
                        {step >=2 && (
                            <TypeWriter
                                text='[system_msg]: "Hello World" >> _hi, my name is'
                                typingSpeed={70}
                                onComplete={() => setStep(3)} 
                            />
                        )}
                    </>
                )}
                {/* Step 3: Name */}
                {step >=3 && (
                    <h1 className="about__name">
                        <TypeWriter 
                            text="Michael Crowe"
                            typingSpeed={90}
                            startDelay={700}
                            onComplete={() => setStep(4)}about__name
                        />
                    </h1>
                )}
                {/*Step 4: Title */}
                {step >= 4 && (
                    <div className="about__title">
                        <TypeWriter 
                            text='[Cyber Security Professional] && [Junior Developer]'
                            typingSpeed={80}
                            startDelay={1000}
                            onComplete={() => setStep(5)}
                        />
                    </div>
                )}
                {/*Step 5 and 6: Scanning Status */}
                {(step === 5 || step === 6 ) && (
                    <div className="about__status">
                        <TypeWriter
                            key={step}
                            text={step === 5 ? "Scanning Interests..." : "[OK] Scanning Complete. Found 5 entries: {Fetching Data...}"}
                            typingSpeed={100}
                            onComplete={() => {
                                if (step === 5) {
                                    setTimeout(() => setStep(6), 2000);
                                } else if (step === 6) {
                                    setTimeout(() => setStep(7), 1500); //trigger the list
                                }
                            }}
                        />
                    </div>
                )}
                {/* Step 7: Interests List */}
                <div className={`about__interests ${step === 7 ? 'about__interests--active' : ''}`}>
                    <p className="about__interests-root">├── Interests/</p>
                    <ul className="about__interests-list">
                        <li className="about__interests-item">├── Cyber Security</li>
                        <li className="about__interests-item">├── Programming</li>
                        <li className="about__interests-item">├── Web Development</li>
                        <li className="about__interests-item">├── AI Development</li>
                        <li className="about__interests-item">└── AI Engineering</li>
                    </ul>
                </div>
            </section>

            {/*Visual Side (Logo and Credits for myself and Gemini for making the logo with my ideas) */}
            <section className="about__visual">
                <img 
                    src={logo}
                    alt='Cyber Dev Logo'
                    className='about__logo'
                />
                <div className="about__credits">
                    <p>Engineered by <span className="highlight">Human Intent</span></p>
                    <div className='divider'>//</div>
                    <p>Augmented by <span className="highlight">Gemini AI</span></p>
                </div>
            </section>
        </main>
    );
};

export default About;