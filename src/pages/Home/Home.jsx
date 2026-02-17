import React, { useEffect, useRef } from 'react';
import '/src/pages/Home/_home.scss';

const Home = () => {
    const portfolioRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!portfolioRef.current) return;
            
            // 1. Calculate mouse position (-0.75 to 0.75 for smoother tilt)
            const x = (e.clientX / window.innerWidth - 0.5) * 1.5;
            const y = (e.clientY / window.innerHeight - 0.5) * 1.5;

            // 2. Set the Glow Color variable based on side of screen
            const glowColor = x < 0 ? 'rgba(0, 242, 255, 0.4)' : 'rgba(188, 19, 254, 0.4)';

            // 3. Apply all variables to the container
            const root = portfolioRef.current;
            root.style.setProperty('--mouse-x', x);
            root.style.setProperty('--mouse-y', y);
            root.style.setProperty('--glass-glow-color', glowColor);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <main className='portfolio' ref={portfolioRef}>
            <div className='portfolio__blob portfolio__blob--primary'></div>
            <div className='portfolio__blob portfolio__blob--secondary'></div>

            <section className='hero'>
                {/* Card 1: Code Editor */}
                <div className='hero__glass-card hero__glass-card--code'>
                    <div className="code-editor">
                        <header className="code-editor__header">
                            <div className="code-editor__controls">
                                <span className="code-editor__dot code-editor__dot--red"></span>
                                <span className="code-editor__dot code-editor__dot--yellow"></span>
                                <span className="code-editor__dot code-editor__dot--green"></span>
                            </div>
                            <span className="code-editor__file-name">_standards.scss</span>
                        </header>

                        <pre className="code-editor__body">
                            <code>
                                <span className="token--mixin">@mixin</span> <span className="token--name">portfolio-core</span> {'{'} <br />
                                &nbsp;&nbsp;<span className="token--prop">standards</span>: <span className="token--val">"BEM", "SCSS"</span>;<br />
                                &nbsp;&nbsp;<span className="token--prop">layout</span>: <span className="token--val">"Mobile-First"</span>;<br />
                                &nbsp;&nbsp;<span className="token--prop">constraints</span>: <span className="token--val">"No Z-Index"</span>;<br /><br />
                                &nbsp;&nbsp;<span className="token--comment">// Stay professional.</span><br />
                                &nbsp;&nbsp;<span className="token--selector">&:hover</span> {'{'}<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="token--prop">quality</span>: <span className="token--val">100%</span>;<br />
                                &nbsp;&nbsp;{'}'}<br />
                                {'}'}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Card 2: Profile Info */}
                <div className='hero__glass-card hero__glass-card--profile'>
                    <h1>Michael Crowe</h1>
                    <p>Cyber Security. Developer. AI.</p>
                </div>
            </section>

            <nav className='glass-nav'>
                <ul className='glass-nav__list'>
                    <li className='glass-nav__item'><a href="#" className='glass-nav__link'>Projects</a></li>
                    <li className='glass-nav__item'><a href="#" className='glass-nav__link'>About</a></li>
                </ul>
            </nav>
        </main>
    );
};

export default Home;