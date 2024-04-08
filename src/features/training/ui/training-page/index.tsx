import {useEffect, useState} from 'react';
import {RequestCalendarStatus, RequestTrainStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import set from '@image/image/set.svg';

import {calendarThunks, setTrainingStatus} from '../../../calendar/model/calendar-slice.ts';
import {AddErrorModal, ErrorModal} from '../../../calendar/ui';
import {setRequestTrainStatus, trainingThunks} from '../../model/training-slice.ts';
import {TrainingSection} from '../training-section';

import s from './training-page.module.css';
import {pushWithFlow} from "@utils/pushWithFlow.ts";

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const trainingStatus = useAppSelector((state) => state.calendar.trainingStatus);
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

    const onRefreshTrainingList = () => dispatch(calendarThunks.trainingList(() => {
        console.log();
    }));

    const onRefreshTrainingListBack = () => dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Idle }))

    const onRefreshUserJointTrainingBack = () => dispatch(setRequestTrainStatus({ requestTrainStatus: RequestTrainStatus.Idle }))

    const onRefreshUserJointTraining = () => dispatch(trainingThunks.getUserTrainingList());

    const onBackToMain = () => {
        dispatch(pushWithFlow('/main'))
    }

    return (<>
            <div className={s.container}>
                <div className={s.header_container}>
                    <div >
                        <span onClick={onBackToMain}>Главная</span> / <span className={s.header_menu_item}>Тренировки</span>
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
            {trainingStatus === RequestCalendarStatus.Error && <ErrorModal callback={onRefreshTrainingList} back={onRefreshTrainingListBack}/>}
            {requestTrainStatus === RequestTrainStatus.Error && <ErrorModal callback={onRefreshUserJointTraining} back={onRefreshUserJointTrainingBack}/>}
            {openAddErrorModal && <AddErrorModal onClose={onCloseAddErrorModal}/>}
        </>

    )
};
