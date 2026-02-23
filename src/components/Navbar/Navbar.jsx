import React from "react";
import { Link } from 'react-router-dom';
import './_navbar.scss'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to='/' className="navbar__logo">
                    {/* Logo or Name */}
                    MIKE_
                </Link>
                {/*Lists to Pages */}
                <ul className="navbar__list">
                    <li className="navbar__item">
                        <Link to='/' className="navbar__link">Home</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to='/projects' className="navbar__link">Projects</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to='/about' className="navbar__link">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;