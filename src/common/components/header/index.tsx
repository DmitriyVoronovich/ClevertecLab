import {HeaderProps} from '@components/header/types/types.ts';

import {goBackToMain} from "@utils/go-back-to-main.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import s from './header.module.css';

export const HeaderSection = ({nameSection}: HeaderProps) => {
    const dispatch = useAppDispatch();

    const onBackToMain = goBackToMain(dispatch);

    return (<div className={s.header_container}>
        <div className={s.header_menu}>
            <span onClick={onBackToMain} className={s.go_main}>Главная</span> / <span
            className={s.header_menu_item}>{nameSection}</span>
        </div>
    </div>)
};
