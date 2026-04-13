import React from 'react';
import GlassCard from '../../components/GlassCard/GlassCard';
import db from '../../data/database.json';
import '/src/pages/Projects/_projects.scss';


const Projects = () => {

    return (
        <main className='porfolio'>

            {/* Since I am not using z-index, these blobs appear first in the DOM. 
                With absolute positioning, the content following them will naturally 
                stack on top. 
            */}

            <div className='projects__blob projects__blob--primary'></div>
            <div className='projects__blob projects__blob--secondary'></div>

            <section className='projects__container'>
                <header className='projects__grid'>
                    {db.projects.map((project) => (
                        <GlassCard
                            id={project.id}
                            title={project.id}
                            trackMouse={false}
                            slant={1}
                            blur={0}
                            opacity={0}
                            detachedFooter={true}
                            header={project.status}
                            body={project.shortDesc}
                            footer={
                                <div className='profile-info'>
                                    <h2>{project.name}</h2>
                                    <p>{project.status}</p>
                                </div>
                            }
                        />
                    ))}
                </header>
            </section>
        </main>
    );
};

export default Projects