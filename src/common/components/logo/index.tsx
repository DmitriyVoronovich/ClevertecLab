import {logoCleverClass, logoContainerClass} from '@components/logo/class-names.ts';
import {LogoProps} from '@components/logo/types/types.ts';
import clever from '@image/image/clever.svg';
import fit from '@image/image/fit.svg';

import './logo.css';

export const Logo = ({open}: LogoProps) => {
    const logoContainer = logoContainerClass(open);
    const logoClever = logoCleverClass(open);

    return (
        <div className={logoContainer}>
            <img
                src={clever}
                alt="logo"
                className={logoClever}
            />
            <img src={fit} alt="logo" className="logo_fit"/>
        </div>
    )
};
