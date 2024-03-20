import s from './header.module.css';

type HeaderProps = {
    nameSection: string;
};

export const HeaderSection = ({ nameSection }: HeaderProps) => {
    return (
        <div className={s.header_container}>
            <div className={s.header_menu}>
                Главная / <span className={s.header_menu_item}>{nameSection}</span>
            </div>
        </div>
    );
};
