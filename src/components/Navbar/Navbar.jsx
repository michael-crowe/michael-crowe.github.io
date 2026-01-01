import React from 'react';
import '/src/assets/styles/components/_navbar.scss'
import { NavLink } from 'react-router-dom';

import {navLinks, socialLinks} from '/src/data/database.json'

//Icons
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const iconMap = {
    github: <AiFillGithub />,
    linkedin: <AiFillLinkedin />
};



const Navbar = () => {

    return (
        <nav className='navbar'>
            <div className='navbar__left'>
                <div className="navbar__brand">
                    <NavLink className={'navbar__link'} to='/'>
                        michael@crowe-terminal
                    </NavLink>
                </div>
                <ul className='navbar__list'>
                    {navLinks.map((link) => (
                        <li className='navbar__item' key={link.id}>
                            <NavLink className={'navbar__link'} to={link.path}>
                                <span className='navbar__permissions'>r--</span>[{link.name}]
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </div>
            <div className='navbar__right'>
                <ul className='navbar__social-list'>
                    {socialLinks.map((social) => (
                        <li key={social.id} className='navbar__item'>
                            <a 
                                className="navbar__link" 
                                href={social.url} 
                                target="_blank" 
                                rel='noopener noreferrer'
                            >
                                {iconMap[social.name.toLowerCase()]}
                            </a>
                        </li>
                        ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar