import clever from '../../../accets/image/clever.svg';
import fit from '../../../accets/image/fit.svg';
import './logo.css';

export type LogoProps = {
    open?: boolean;
};

export const Logo = ({ open }: LogoProps) => {
    return (
        <div className={`${open ? 'logo_container' : 'logo_container close_logo'}`}>
            <img
                src={clever}
                alt={'logo'}
                className={`${open ? 'logo_clever' : 'logo_clever close'}`}
            />
            <img src={fit} alt={'logo'} className={'logo_fit'} />
        </div>
    );
};
