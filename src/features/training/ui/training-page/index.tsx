import {useEffect, useState} from 'react';
import {RequestCalendarStatus, RequestTrainStatus, TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import set from '@image/image/set.svg';
import {goBackToMain} from '@utils/go-back-to-main.ts';

import {calendarThunks, setTrainingStatus} from '../../../calendar/model/calendar-slice.ts';
import {AddErrorModal, ErrorModal} from '../../../calendar/ui';
import {
    setRequestTrainStatus,
    setSelectedMenuItem,
    trainingThunks
} from '../../model/training-slice.ts';
import {
    findPopularWorkout
} from '../joint-training-block/joint-training/utils/find-popular-workout.ts';
import {TrainingSection} from '../training-section';

import s from './training-page.module.css';
import {settingsThunks} from "../../../settings/model/settings-slice.ts";

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector((state) => state.calendar.training);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
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

    const onRefreshTrainingList = () => dispatch(calendarThunks.trainingList(() => {}));

    const onRefreshTrainingListBack = () => dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Idle }));

    const onRefreshUserJointTrainingBack = () => {
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Idle}));
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
    };

    const onRefreshUserJointTraining = () => {
        const popularTrain = trainingList.find((item) => item.name === findPopularWorkout(training));

        dispatch(trainingThunks.getUserTrainingList({trainingType: `${popularTrain?.key}`}));
    };

    const onBackToMain = goBackToMain(dispatch);

    const onSettingPageOpen = () => {
        dispatch(settingsThunks.getTrafficList());
    };

    return (<>
            <div className={s.container}>
                <div className={s.header_container}>
                    <div >
                        <span onClick={onBackToMain} className={s.go_main}>Главная</span> / <span className={s.header_menu_item}>Тренировки</span>
                    </div>
                    <div className={s.header_content_wrapper} onClick={onSettingPageOpen}>
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
