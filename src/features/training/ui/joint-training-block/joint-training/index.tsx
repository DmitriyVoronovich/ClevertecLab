import {TrainingSelectedMenu} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Button} from 'antd';

import {setSelectedMenuItem, trainingThunks} from '../../../model/training-slice.ts';

import s from './joint-training.module.css';
import {TrainingParams} from "../../../../calendar/model/types/types.ts";
import {MyTrainingPartner} from "../../my-training-partner";
import Invite from "../../../../invite/ui/invite";

export const findPopularWorkout = (workouts: TrainingParams[]) => {
    const workoutLoad = workouts.reduce((acc: { [key: string]: number }, workout) => {
        const load = workout.exercises.reduce((accum: number, {
            replays,
            weight,
            approaches
        }) => accum + replays * weight * approaches, 0);

        return ({
            ...acc,
            [workout.name]: (acc[workout.name] || 0) + load,
        });
    }, {});

    return Object.keys(workoutLoad).reduce((a, b) => workoutLoad[a] > workoutLoad[b] ? a : b);
}
export const JointTraining = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector((state) => state.calendar.training);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const trainingPalsList = useAppSelector((state) => state.training.trainingPalsList);

    const inviteList = useAppSelector((state) => state.invite.inviteList)

    const onViewJointTrainingList = () => {
        dispatch(trainingThunks.getAllUserTrainingList());
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.UserJointTrainingList}));
    };

    const onClicked = () => {
        const popularTrain = trainingList.find((item) => item.name === findPopularWorkout(training));

        dispatch(trainingThunks.getUserTrainingList({trainingType: `${popularTrain?.key}`}));
        dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.UserJointTrainingList}));
    }

    return (<div className={s.joint_training_container}>
        {inviteList.length !== 0 && <Invite/>}
        <div className={s.joint_training_front_wrapper}>
            <p className={s.joint_training_title}>Хочешь тренироваться с тем, кто
                разделяет твои цели и темп?<br/> Можешь найти друга
                для совместных тренировок среди других пользователей.</p>
            <p className={s.joint_training_description}>Можешь воспользоваться случайным
                выбором или выбрать друга с похожим на твой уровень и вид тренировки, и мы
                найдем тебе идеального спортивного друга.</p>
            <div className={s.joint_training_button_group}>
                <Button className={s.joint_training_button}
                        onClick={onViewJointTrainingList}>Случайный выбор</Button>
                <Button className={s.joint_training_friend_button} onClick={onClicked}>Выбор друга по моим тренировкам</Button>
            </div>
        </div>
        {trainingPalsList.length === 0 ? <div className={s.joint_training_description_wrapper}>
                <p className={s.joint_training_description_title}>Мои партнёры по тренировкам</p>
                <p className={s.joint_training_description_text}>У вас пока нет партнёров для совместных тренировок</p>
            </div>
            : <MyTrainingPartner/>}
    </div>)
};
