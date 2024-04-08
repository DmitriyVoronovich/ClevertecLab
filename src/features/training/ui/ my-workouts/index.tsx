import {useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Button} from 'antd';

import {AddTrainingDrawerModal} from '../add-training-drawer-modal';
import {TrainingTable} from '../training-table';

import s from './my-workouts.module.css';

export const MyWorkouts = () => {
    const training = useAppSelector((state) => state.calendar.training);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [open, setOpen] = useState(false);


    const onCloseDrawer = () => setOpen(false);

    const onOpenDrawer = () => setOpen(true);

    return (
        <>
            {!training.length
                ? <div className={s.not_workouts_container}>
                    <p className={s.not_workouts_description}>У вас ещё нет созданных тренировок</p>
                    <Button className={s.not_workouts_button} onClick={onOpenDrawer}>Создать
                        тренировку</Button>
                </div>
                : <div className="training_table_container">
                    <TrainingTable/>
                    {trainingList.length && <Button className={s.add_training_button} onClick={onOpenDrawer} data-test-id='create-new-training-button'>
                        <PlusOutlined size={14}/>
                        <span className={s.add_training_button_title}>Новая тренировка</span>
                    </Button>}
                </div>}
            {open && <AddTrainingDrawerModal onClose={onCloseDrawer}/>}
        </>

    );
};
