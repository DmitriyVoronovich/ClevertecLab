import set from '../../../accets/image/set.svg';

import './header.css';
import {settingsThunks} from '../../../features/settings/model/settings-slice.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';

export const Header = () => {
    const dispatch = useAppDispatch();
    const onSettingPageOpen = () => {
        dispatch(settingsThunks.getTrafficList());
    };

    return (<div className="header_container">
        <div className="header_menu">
            <span className="header_menu_item">Главная</span>
        </div>
        <div className="header_wrapper">
            <h1 className="header_title">
                Приветствуем тебя в CleverFit — приложении,
                <br/> которое поможет тебе добиться своей мечты!
            </h1>
            <div className="header_content_wrapper"
                 data-test-id='header-settings' onClick={onSettingPageOpen}>
                <img src={set} className="header_content_svg" alt="Настройки"/>
                <span className="header_content_item">Настройки</span>
            </div>
        </div>
    </div>)
};
