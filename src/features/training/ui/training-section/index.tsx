import {AddTrainingStatus, RequestTrainStatus, TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import classNames from 'classnames';

import {MyWorkouts} from '../ my-workouts';
import {setAddTrainingStatus} from '../../../calendar/model/calendar-slice.ts';
import {
    setRequestTrainStatus,
    setSelectedMenuItem,
    trainingThunks
} from '../../model/training-slice.ts';

import {AlertNotification} from './alert-notification';

import './training-section.css';
import {JointTraining} from "../joint-training-block/joint-training";

export const TrainingSection = () => {
    const dispatch = useAppDispatch();
    const selectedMenuItem = useAppSelector((state) => state.training.selectedMenuItem);
    const requestTrainStatus = useAppSelector((state) => state.training.requestTrainStatus);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);

    const workoutsTrainingTitle = classNames({
        'training_section_title': true,
        'active': selectedMenuItem === TrainingSelectedMenu.MyWorkouts
    })

    const jointTrainingTitle = classNames({
        'training_section_title': true,
        'active': selectedMenuItem === TrainingSelectedMenu.JointTraining
    })

    const marafonTitle = classNames({
        'training_section_title': true,
        'active': selectedMenuItem === TrainingSelectedMenu.Marafon
    })

    const onAddAlertClose = () => dispatch(setRequestTrainStatus({ requestTrainStatus: RequestTrainStatus.Idle }));

    const onEditAlertClose = () => dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Idle }));

    const onMyWorkoutOpen = () => dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.MyWorkouts}));
    const onJointTrainingOpen = () => {
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
        dispatch(trainingThunks.getTrainingPalsList());
    };
    const onMarafonPageOpen = () => dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.Marafon}));

    return (<>
            <div className="training_section_container">
                <div className="training_section_title_wrapper">
                    <h3 className={workoutsTrainingTitle} onClick={onMyWorkoutOpen}>Мои
                        тренировки</h3>
                    <h3 className={jointTrainingTitle} onClick={onJointTrainingOpen}>Совместные
                        тренировки</h3>
                    <h3 className={marafonTitle} onClick={onMarafonPageOpen}>Марафоны</h3>
                </div>
                {selectedMenuItem === TrainingSelectedMenu.MyWorkouts && <MyWorkouts/>}
                {selectedMenuItem === TrainingSelectedMenu.JointTraining && <JointTraining/>}
            </div>
            {requestTrainStatus === RequestTrainStatus.Succeeded && <AlertNotification onClose={onAddAlertClose} message="Новая тренировка успешно добавлена"/>}
            {addTrainingStatus === AddTrainingStatus.Success && <AlertNotification onClose={onEditAlertClose} message="Тренировка успешно обновлена"/>}
        </>

    );
};
