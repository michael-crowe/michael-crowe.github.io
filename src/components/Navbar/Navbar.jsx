import React from "react";
import { NavLink } from 'react-router-dom';
import './_navbar.scss'

const Navbar = ({ isAdmin }) => {

    const getLinkClass = ({ isActive }) =>
        isActive ? 'navbar__link navbar__link--active' : 'navbar__link';

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <NavLink to='/' className="navbar__logo">
                    {/* Logo or Name */}
                    MIKE_
                </NavLink>
                {/*Lists to Pages */}
                <ul className="navbar__list">
                    <li className="navbar__item">
                        <NavLink to='/' end className={getLinkClass}>Home</NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink to='/projects' className={getLinkClass}>Projects</NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink to='/about' className={getLinkClass}>About</NavLink>
                    </li>

                    {isAdmin && (
                        <li>
                            <NavLink to='./admin' className={getLinkClass}>[!] Admin</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;