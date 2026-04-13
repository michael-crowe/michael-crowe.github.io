import React, { useRef, useEffect } from 'react';
import './_glass-card.scss';

const GlassCard = ({ 
    title, 
    current_status, 
    body, 
    footer, 
    modifier = '',
    detachedFooter = false, 
    trackMouse = false,
    blur = 25,
    tiltLimit = 10,
    slant = 0,  // positive or negative values 
    glowColor = 'rgba(0, 242, 255, 0.2)',
    opacity = 0.05
}) => {
    const cardRef = useRef(null);

    // 1. Local Mouse Tracking (Only runs if trackMouse is true)
    useEffect(() => {
        if (!trackMouse || !cardRef.current) return;

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 1.5;
            const y = (e.clientY / window.innerHeight - 0.5) * 1.5;
            
            const root = cardRef.current;
            root.style.setProperty('--mouse-x', x);
            root.style.setProperty('--mouse-y', y);
            // Dynamic glow color based on screen side (like your Home page)
            const dynamicGlow = x < 0 ? 'rgba(0, 242, 255, 0.4)' : 'rgba(188, 19, 254, 0.4)';
            root.style.setProperty('--glass-glow-color', dynamicGlow);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [trackMouse]);

    const glassStyle = {
        '--card-blur': `${blur}px`,
        '--card-tilt-limit': `${tiltLimit}deg`,
        '--card-slant': `${slant}deg`,
        '--card-glow': glowColor,
        '--card-opacity': opacity
    };

    return (
        <div 
            className={`glass-group ${trackMouse ? 'glass-group--interactive' : ''}`} 
            style={glassStyle}
            ref={cardRef}
        >
            {/* Main Card Shell */}
            <div className={`hero__glass-card ${modifier}`}>
                <div className='hero__glass-card__header'>
                    {current_status && (
                        <span className='hero__glass-card__status'>{current_status}</span>
                    )}
                    <h3 className='hero__glass-card__title'>{title || 'Untitled Project'}</h3>
                </div>
                    
                {body && (
                    <div className='hero__glass-card__body'>{body}</div>
                )}
                
                {/* Internal Footer */}
                {footer && !detachedFooter && (
                    <div className='hero__glass-card__footer'>{footer}</div>
                )}
            </div>

            {/* Detached Footer (The "Michael Crowe" pill look) */}
            {footer && detachedFooter && (
                <div className='hero__glass-card hero__glass-card--detached'>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default GlassCard;