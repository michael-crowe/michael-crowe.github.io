import React from 'react';
import '/src/pages/SecretProject/_secretproject.scss';

const SecretProject = () => {



    return (
        <main className='secret-project'>
            <div className='portfolio__blob portfolio__blob--primary'></div>
            <div className='portfolio__blob portfolio__blob--secondary'></div>

            <section className='secret-project'>
                <div className='secret-project'>
                    <h2 className='secret-project__title'>PROJECT: BLACK_BOX</h2>
                    <p className='secret-project__desc'>
                        This project is hidden from standard users. It showcases a
                        deep-dive into penetration testing and network security.
                    </p>
                    <button className='nav__link--active'>View Secure Repo</button>
                </div>
            </section>
        </main>
    );

};


export default SecretProject;