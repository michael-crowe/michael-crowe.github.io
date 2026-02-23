//Mouse Movement

import { useEffect } from "react";

export const useMousePosition = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            //Calculate coordinates (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            //set Global CSS variables for the SCSS Mixin
            document.documentElement.style.setProperty('--mouse-x', x.toFixed(2));
            document.documentElement.style.setProperty('--mouse-y', y.toFixed(2));
        };

        window.addEventListener('mousemove', handleMouseMove);

        //Cleanup: prevents memnory leaks
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
};
