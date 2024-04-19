// eslint-disable-next-line unicorn/filename-case
import {useEffect, useState} from 'react';
import {TABLET_SIZE} from '@utils/constant/constant.ts';

const isWindowMobile = () => window.innerWidth < TABLET_SIZE;

export const useIsTablet = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        function handleResize() {
            setIsMobile(isWindowMobile());
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return isMobile
};
