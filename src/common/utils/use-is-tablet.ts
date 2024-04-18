// eslint-disable-next-line unicorn/filename-case
import {useEffect, useState} from 'react';

const isWindowMobile = () => window.innerWidth < 835;

export const useIsTablet = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        function handleResize() {
            setIsMobile(isWindowMobile());
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return isMobile
};
