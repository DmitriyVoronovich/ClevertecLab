import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import set from '@image/image/set.svg';

import {settingsThunks} from '../../../settings/model/settings-slice.ts';
import {ProfileSection} from '../profile-section';

import s from './profile-page.module.css';
import {goBackToMain} from "@utils/go-back-to-main.ts";

export const ProfilePage = () => {
    const dispatch = useAppDispatch();

    const onSettingPageOpen = () => {
        dispatch(settingsThunks.getTrafficList());
    };

    const onBackToMain = goBackToMain(dispatch);

    return (
        <div className={s.container}>
            <div className={s.header_container}>
                <div>
                    <span onClick={onBackToMain} className={s.go_main}>Главная</span> / <span
                    className={s.header_menu_item}>Профиль</span>
                </div>
                <div className={s.header_content_wrapper} onClick={onSettingPageOpen}
                     data-test-id='header-settings'>
                    <img src={set} className={s.header_content_svg} alt="Настройки"/>
                    <span className={s.header_content_item}>Настройки</span>
                </div>
            </div>
            <ProfileSection/>
        </div>
    )
};
