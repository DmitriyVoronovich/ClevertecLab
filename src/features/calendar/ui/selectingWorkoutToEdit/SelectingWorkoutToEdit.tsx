import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { BadgeComponent } from '../../../../common/components/badgeComponent/BadgeComponent.tsx';
import { AddTrainingStatus } from '../../../../common/enums/enums.ts';
import { isMobile } from '../../../../common/utils/isMobile.ts';
import { calendarThunks } from '../../model/calendarSlice.ts';
import { TrainExercises } from '../../model/types/types.ts';
import { DrawerModal } from '../drawerModal/DrawerModal.tsx';
import { SelectingWorkoutToEditProps } from '../selectingWorkoutToEdit/types/types.ts';
import { transformDate } from '../selectingWorkoutToEdit/utils/transformDate.ts';
import { WorkoutEditModal } from '../workoutEditModal/WorkoutEditModal.tsx';
import '../addTrainingModal/addTrainingModal.css';

export const SelectingWorkoutToEdit = ({
    date,
    onCloseEditModal,
    modalStyle,
    separateWorkout,
    addButtonBlock,
}: SelectingWorkoutToEditProps) => {
    const dispatch = useAppDispatch();
    const searchExercises = useAppSelector((state) => state.calendar.searchExercises);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [openEditDrawerModal, setOpenEditDrawerModal] = useState(false);
    const [openDrawerModal, setOpenDrawerModal] = useState(false);
    const [selectTrain, setSelectTrain] = useState(separateWorkout.name);
    const [trainExercise, setTrainExercise] = useState<TrainExercises[]>(separateWorkout.exercises);

    const selectedTrainingItem = trainingList.find((item) => item.name === separateWorkout.name);

    const list = trainingList.reduce(
        (acm, trainingListItem) => {
            if (!searchExercises.find((searchItem) => searchItem.name === trainingListItem.name)) {
                acm.push(trainingListItem);
            }
            return acm;
        },
        [selectedTrainingItem],
    );

    useEffect(() => {
        const hiddenDiv = document.querySelector(
            '.add_training_modal > div:first-child[aria-hidden=true]',
        ) as HTMLElement;
        if (hiddenDiv) {
            hiddenDiv.style.display = 'none';
        }
    }, []);

    const handleChange = (value: string) => {
        setSelectTrain(value);
        if (value === selectedTrainingItem?.key) {
            setTrainExercise(separateWorkout.exercises);
        } else {
            setTrainExercise([]);
        }
    };

    const handleSave = () => {
        if (selectTrain === selectedTrainingItem?.name) {
            const trainArg = transformDate(
                separateWorkout.name,
                date,
                addButtonBlock,
                trainExercise,
            );
            dispatch(
                calendarThunks.editTraining({
                    training: trainArg,
                    trainingId: separateWorkout._id || '',
                }),
            );
            onCloseEditModal();
        } else {
            const trainName = trainingList.find((item) => item.key === selectTrain);
            if (trainName) {
                const trainArg = transformDate(trainName.name, date, false, trainExercise);
                onCloseEditModal();
                dispatch(calendarThunks.addTraining(trainArg));
            }
        }
    };

    const handleOk = () => setOpenDrawerModal(true);

    const handleCancel = () => onCloseEditModal();

    const onDrawerModalClose = () => setOpenDrawerModal(false);

    const onEditDrawerModalClose = () => setOpenEditDrawerModal(false);

    const onAddTrainExercise = (train: TrainExercises[]) => setTrainExercise(train);

    const onEditDrawerModalOpen = () => setOpenEditDrawerModal(true);

    return (
        <>
            <Modal
                data-test-id='modal-create-exercise'
                className={'add_training_modal'}
                open={true}
                width={isMobile() ? 312 : 264}
                mask={false}
                maskClosable={false}
                closable={false}
                style={isMobile() ? { top: '25%' } : modalStyle}
                footer={[
                    <Button
                        key='save'
                        type='default'
                        onClick={handleOk}
                        className={'add_training_modal_button'}
                        disabled={addButtonBlock}
                    >
                        Добавить упражнение
                    </Button>,
                    <Button
                        key='submit'
                        type='default'
                        onClick={handleSave}
                        disabled={
                            !trainExercise?.length && selectTrain !== selectedTrainingItem?.name
                        }
                        className={'save_training_modal_button'}
                        loading={addTrainingStatus === AddTrainingStatus.Loading}
                    >
                        {addButtonBlock ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>,
                ]}
            >
                <div className={'add_training_header_wrapper'}>
                    <ArrowLeftOutlined
                        style={{ width: '14px', height: '14px' }}
                        onClick={handleCancel}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        data-test-id='modal-create-exercise-select'
                        className={'add_training_selector'}
                        defaultValue={selectedTrainingItem?.key}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        options={list.map((item, index) => ({
                            value: item?.key,
                            label: (
                                <BadgeComponent
                                    name={item?.name}
                                    color={item?.color}
                                    index={index}
                                    fontSize={'14px'}
                                    fontWeight={'500'}
                                />
                            ),
                        }))}
                    />
                </div>
                <div className={'add_training_modal_list_wrapper'}>
                    {!trainExercise.length ? (
                        <div className={'add_training_modal_none_list'}></div>
                    ) : (
                        <ul className={'add_training_modal_list'}>
                            {trainExercise.map((item, index) => {
                                return (
                                    <li key={item.name} className={'add_training_modal_list_item'}>
                                        <div className={'add_training_modal_title'}>
                                            {item.name}
                                        </div>
                                        <EditOutlined
                                            onClick={onEditDrawerModalOpen}
                                            className={'edit_svg'}
                                            data-test-id={`modal-update-training-edit-button${index}`}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </Modal>
            {openDrawerModal && (
                <DrawerModal
                    onDrawerModalClose={onDrawerModalClose}
                    selectTrain={selectTrain}
                    date={date}
                    onAddTrainExercise={onAddTrainExercise}
                    trainExercise={trainExercise}
                />
            )}
            {openEditDrawerModal && (
                <WorkoutEditModal
                    open={openEditDrawerModal}
                    selectedTrainingItem={selectedTrainingItem}
                    onEditDrawerModalClose={onEditDrawerModalClose}
                    separateWorkout={separateWorkout}
                    date={date}
                    onAddTrainExercise={onAddTrainExercise}
                />
            )}
        </>
    );
};
