import {useEffect, useState} from 'react';
import {RequestTrainStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import set from '@image/image/set.svg';

import {AddErrorModal, ErrorModal} from '../../../calendar/ui';
import {setRequestTrainStatus} from '../../model/training-slice.ts';
import {TrainingSection} from '../training-section';

import s from './training-page.module.css';

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const requestTrainStatus = useAppSelector((state) => state.training.requestTrainStatus);
    const [openAddErrorModal, setOpenAddErrorModal] = useState(false);

    useEffect(() => {
        if (requestTrainStatus === RequestTrainStatus.Failed) {
            setOpenAddErrorModal(true);
        }
    }, [requestTrainStatus]);

    const onCloseAddErrorModal = () => {
        setOpenAddErrorModal(false)
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Idle}))
    };

    return ( <>
        <div className={s.container}>
            <div className={s.header_container}>
                <div>
                    Главная / <span className={s.header_menu_item}>Тренировки</span>
                </div>
                <div className={s.header_content_wrapper}>
                    <img src={set} className={s.header_content_svg} alt="Настройки"/>
                    <span className={s.header_content_item}>Настройки</span>
                </div>
            </div>
            <div className={s.section_wrapper}>
                <TrainingSection/>
            </div>
        </div>
        <ErrorModal/>
        {openAddErrorModal && <AddErrorModal onClose={onCloseAddErrorModal}/>}
    </>

)};
