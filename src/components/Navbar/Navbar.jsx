import React from 'react';
import '/src/assets/styles/components/_navbar.scss'
import { NavLink } from 'react-router-dom';

//Icons
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

//creating array of links

const navLinks = [
    {
        name: 'Home',
        path: '/',
        id: '1'
    },
    {
        name: 'Archive',
        path: '/Archive',
        id: '2'
    },
    {
        name: 'Terminal',
        path: '/Terminal',
        id: '3'
    }

]

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
                        {
                            navLinks.map((link) => (
                                <li className='navbar__item' key={link.id}>
                                    <NavLink className={'navbar__link'} to={link.path}>
                                        <span className='navbar__permissions'>r--</span>[{link.name}]
                                    </NavLink>
                                </li>

                            ))
                        }
                    </ul>

            </div>
            <div className='navbar__right'>
                <div className='navbar__social-list'>
                    <a className='navbar__link' href="https://github.com/michael-crowe" target="_blank" rel='noopener noreferrer'>
                        <AiFillGithub />
                    </a>
                    <a className='navbar__link' href="https://www.linkedin.com/in/michael--crowe/" target="_blank" rel="noopener noreferrer">
                        <AiFillLinkedin />
                    </a>
                </div>
            </div>

        </nav>
    );
};

export default Navbar