import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { AddTrainingStatus } from '@enums/enums.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal, Select } from 'antd';
import Badge from 'antd/lib/badge';

import { TrainExercises } from '../../model/types/types.ts';
import { DrawerModal } from '../drawer-modal';

import { AddTrainingModalProps } from './types/types.ts';
import { onShapingTraining } from './utils/on-shaping-training.ts';

import './add-training-modal.css';

export const AddTrainingModal = ({
    date,
    onCloseAddModal,
    modalStyle,
    addButtonBlock,
}: AddTrainingModalProps) => {
    const dispatch = useAppDispatch();
    const searchExercises = useAppSelector((state) => state.calendar.searchExercises);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [openDrawerModal, setOpenDrawerModal] = useState(false);
    const [selectTrain, setSelectTrain] = useState('Выбор типа тренировки');

    // @ts-ignore
    const [trainExercise, setTrainExercise] = useState<TrainExercises[]>([{}]);

    const screenWidth = window.innerWidth;
    let list;

    if (searchExercises) {
        const array = searchExercises.map((item) => item.name);

        list = trainingList.filter((item) => !array.includes(item.name));
    }

    useEffect(() => {
        if (addTrainingStatus === AddTrainingStatus.Success) {
            setTrainExercise([]);
            setSelectTrain('Выбор типа тренировки');
            onCloseAddModal();
        }
    }, [addTrainingStatus]);

    const handleOk = () => setOpenDrawerModal(true);

    const handleChange = (value: string) => {
        setSelectTrain(value);
        setTrainExercise([]);
    };

    const handleSave = () => {
        const trainName = trainingList.find((item) => item.key === selectTrain);

        onShapingTraining(trainName, date, trainExercise, dispatch);
    };

    const handleCancel = () => {
        onCloseAddModal();
        setSelectTrain('Выбор типа тренировки');
    };

    const onDrawerModalClose = () => setOpenDrawerModal(false);

    const onAddTrainExercise = (train: TrainExercises[]) => setTrainExercise(train);

    return (
        <>
            <Modal
                data-test-id='modal-create-exercise'
                className="add_training_modal"
                open={true}
                width={screenWidth < 361 ? 312 : 264}
                mask={false}
                maskClosable={false}
                closable={false}
                style={screenWidth > 361 ? modalStyle : { top: '25%' }}
                footer={[
                    <Button
                        key='save'
                        type='default'
                        onClick={handleOk}
                        className="add_training_modal_button"
                        disabled={selectTrain === 'Выбор типа тренировки'}
                    >
                        Добавить упражнения
                    </Button>,
                    <Button
                        key='submit'
                        type='default'
                        onClick={handleSave}
                        disabled={trainExercise.length === 0}
                        className="save_training_modal_button"
                        loading={addTrainingStatus === AddTrainingStatus.Loading}
                    >
                        Сохранить
                    </Button>,
                ]}
            >
                <div className="add_training_header_wrapper">
                    <ArrowLeftOutlined
                        style={{ width: '14px', height: '14px' }}
                        onClick={handleCancel}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        data-test-id='modal-create-exercise-select'
                        className="add_training_selector"
                        value={selectTrain}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        options={list?.map((item) => ({
                            value: item.key,
                            label: (
                                <Badge
                                    color={item.color}
                                    text={item.name}
                                    style={{
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        lineHeight: '130%',
                                    }}
                                />
                            ),
                        }))}
                    />
                </div>
                <div className="add_training_modal_list_wrapper">
                    {!trainExercise.length || !Object.keys(trainExercise[0]).length ? (
                        <div className="add_training_modal_none_list" />
                    ) : (
                        <ul className="add_training_modal_list">
                            {trainExercise.map((item) => (
                                    <li key={item.name} className="add_training_modal_list_item">
                                        <div className="add_training_modal_title">
                                            {item.name}
                                        </div>
                                        <EditOutlined
                                            className={
                                                addButtonBlock ? 'edit_svg_disabled' : 'edit_svg'
                                            }
                                        />
                                    </li>
                                ))}
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
        </>
    );
};
