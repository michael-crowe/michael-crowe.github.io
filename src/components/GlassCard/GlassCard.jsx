import React from 'react';
import './_glass-card.scss';

const GlassCard = ({ 
    title, 
    current_status, 
    body, 
    footer, 
    modifier = '',
    blur = 25,
    tiltLimit = 10,
    glowColor = 'rgba(0, 242, 255, 0.2)',
    opacity = 0.05

}) => {

    const glassStyle = {
        '--card-blur': `${blur}px`,
        '--card-tilt-limit': `${tiltLimit}deg`,
        '--card-glow': glowColor,
        '--card-opactiy': opacity
    }


    return (
        
        /*Add style={glassStyle} to pass variable to the mixin */
        <div className={`hero__glass-card ${modifier}`} style={glassStyle}>

            {/**Header information */}
            <div className='hero__glass-card__header'>

                {/* Current Status - Optional*/}
                {/*Ensuring current_status exsists IF it does, then render the span and current_stauts information */}
                {current_status && (
                    <span className='hero__glass-card__status'>{current_status}</span>
                )}
                {/*Setting a default value for title incase one isnt' added to avoid useless rednering
                    and reminding the user that a title is missed */}
                <h3 className='hero__glass-card__title'>{title || 'Untitled Project'}</h3>
            </div>

            {/*Body details */}
            <div className='hero__glass-card__body'>
                {/* 'children' allows you to put anything inside (I used a code editor on my project) */}
                {body}
            </div>

            {/*Footer Details - Optional */}
            {/**Ensuring Footer exsists IF it does, then render the DIV and footer information */}
            {footer && (
                <div className='hero__glass-card__footer'>
                    {/**having the ability to add what you want in the footer */}
                    {footer}
                </div>
            )}

        </div>
    )
}