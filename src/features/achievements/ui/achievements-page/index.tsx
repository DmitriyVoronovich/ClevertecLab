import {useEffect, useState} from 'react';
import {RequestTrainStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import set from '@image/image/set.svg';
import {goBackToMain} from '@utils/go-back-to-main.ts';

import {AddErrorModal} from '../../../calendar/ui';
import {setRequestTrainStatus} from '../../../training/model/training-slice.ts';
import {AchievementsSection} from '../achievements-section';

import s from '../../../training/ui/training-page/training-page.module.css';
import {settingsThunks} from "../../../settings/model/settings-slice.ts";

export const AchievementsPage = () => {
    const dispatch = useAppDispatch();
    const requestTrainStatus = useAppSelector((state) => state.training.requestTrainStatus);
    const [openAddErrorModal, setOpenAddErrorModal] = useState(false);

    useEffect(() => {
        if (requestTrainStatus === RequestTrainStatus.Failed) {
            setOpenAddErrorModal(true);
        }
    }, [requestTrainStatus]);

    const onBackToMain = goBackToMain(dispatch);

    const onCloseAddErrorModal = () => {
        setOpenAddErrorModal(false)
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Idle}))
    };

    const onSettingPageOpen = () => {
        dispatch(settingsThunks.getTrafficList());
    };

    return (
        <>
            <div className={s.container}>
                <div className={s.header_container}>
                    <div>
                        <span onClick={onBackToMain} className={s.go_main}>Главная</span> / <span
                        className={s.header_menu_item}>Достижения</span>
                    </div>
                    <div className={s.header_content_wrapper} onClick={onSettingPageOpen}>
                        <img src={set} className={s.header_content_svg} alt="Настройки"/>
                        <span className={s.header_content_item}>Настройки</span>
                    </div>
                </div>
                <div className={s.section_wrapper}>
                    <AchievementsSection/>
                </div>
            </div>
            {openAddErrorModal && <AddErrorModal onClose={onCloseAddErrorModal}/>}
        </>

    );
};
