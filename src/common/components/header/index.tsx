import {HeaderProps} from '@components/header/types/types.ts';

import s from './header.module.css';

export const HeaderSection = ({nameSection}: HeaderProps) => (
    <div className={s.header_container}>
        <div className={s.header_menu}>
            Главная / <span className={s.header_menu_item}>{nameSection}</span>
        </div>
    </div>
);
