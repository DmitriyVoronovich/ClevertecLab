import {AddTrainingStatus, RequestTrainStatus, TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import Badge from 'antd/lib/badge';
import classNames from 'classnames';

import {MyWorkouts} from '../ my-workouts';
import {setAddTrainingStatus} from '../../../calendar/model/calendar-slice.ts';
import {inviteThunks} from '../../../invite/model/invite-slice.ts';
import {
    setRequestTrainStatus,
    setSelectedMenuItem,
    trainingThunks
} from '../../model/training-slice.ts';
import {JointTraining} from '../joint-training-block/joint-training';
import {UserJointTrainingList} from '../joint-training-block/user-joint-training-list';
import {MyTrainingPartner} from '../my-training-partner';

import {AlertNotification} from './alert-notification';

import './training-section.css';

export const TrainingSection = () => {
    const dispatch = useAppDispatch();
    const selectedMenuItem = useAppSelector((state) => state.training.selectedMenuItem);
    const inviteList = useAppSelector((state) => state.invite.inviteList);
    const requestTrainStatus = useAppSelector((state) => state.training.requestTrainStatus);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);

    const workoutsTrainingTitle = classNames({
        'training_section_title': true,
        'active': selectedMenuItem === TrainingSelectedMenu.MyWorkouts
    });

    const jointTrainingTitle = classNames({
        'training_section_title': true,
        'active': selectedMenuItem === TrainingSelectedMenu.JointTraining
    });

    const marafonTitle = classNames({
        'training_section_title': true,
        'active': false
    });

    const onAddAlertClose = () => dispatch(setRequestTrainStatus({ requestTrainStatus: RequestTrainStatus.Idle }));

    const onEditAlertClose = () => dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Idle }));

    const onMyWorkoutOpen = () => dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.MyWorkouts}));
    const onJointTrainingOpen = () => {
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.JointTraining}));
        dispatch(trainingThunks.getTrainingPalsList());
        dispatch(inviteThunks.getInvite());
    };

    return (<>
            <div className="training_section_container">
                <div className="training_section_title_wrapper">
                    <h3 className={workoutsTrainingTitle} onClick={onMyWorkoutOpen}>Мои
                        тренировки</h3>
                    <h3 className={jointTrainingTitle} onClick={onJointTrainingOpen}>Совместные
                        тренировки <Badge count={inviteList.length} /></h3>
                    <h3 className={marafonTitle}>Марафоны</h3>
                </div>
                {selectedMenuItem === TrainingSelectedMenu.MyWorkouts && <MyWorkouts/>}
                {selectedMenuItem === TrainingSelectedMenu.JointTraining && <JointTraining/>}
                {selectedMenuItem === TrainingSelectedMenu.UserJointTrainingList && <UserJointTrainingList/>}
                {selectedMenuItem === TrainingSelectedMenu.MyTrainingPartner && <MyTrainingPartner/>}
            </div>
            {requestTrainStatus === RequestTrainStatus.Succeeded && <AlertNotification onClose={onAddAlertClose} dataId="create-training-success-alert" message="Новая тренировка успешно добавлена"/>}
            {addTrainingStatus === AddTrainingStatus.Success && <AlertNotification onClose={onEditAlertClose} dataId="create-training-success-alert" message="Тренировка успешно обновлена"/>}
        </>

    );
};
