import { useEffect, useState } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { BadgeComponent } from '@components/index.ts';
import { AddTrainingStatus } from '@enums/enums.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import icon from '@image/calendar-page/training_modal.svg';
import { useIsMobile } from '@utils/useIsMobile.ts';
import { Button, Modal } from 'antd';

import { TrainingParams } from '../../model/types/types.ts';
import { AddErrorModal } from '../add-error-modal';
import { AddTrainingModal } from '../add-training-modal';
import { formateDate } from '../drawer-modal/utils/formate-date.ts';
import { SelectingWorkoutToEdit } from '../selecting-workout-to-edit';

import { TrainingModalProps } from './types/types.ts';
import { onChangeButtonBlock } from './utils/on-change-button-block.ts';

import './training-modal.css';

export const TrainingModal = ({ modalStyle, onCloseTrainingModal, date }: TrainingModalProps) => {
    const searchExercises = useAppSelector((state) => state.calendar.searchExercises);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [addButtonBlock, setAddButtonBlock] = useState<boolean>(false);
    const [separateWorkout, setSeparateWorkout] = useState<TrainingParams>({} as TrainingParams);
    const isMobile = useIsMobile();

    const isActiveTraining = searchExercises.length === 0;

    useEffect(() => {
        onChangeButtonBlock(date, searchExercises, setAddButtonBlock);
    });

    const handleOk = () => setOpenAddModal(true);

    const handleCancel = () => onCloseTrainingModal();

    const onCloseAddModal = () => setOpenAddModal(false);

    const onCloseEditModal = () => setOpenEditModal(false);

    const onChooseWorkout = (item: TrainingParams) => {
        setSeparateWorkout(item);
        setOpenEditModal(true);
    };

    return (
        <>
            {!openAddModal && !openEditModal && (
                <Modal
                    data-test-id='modal-create-training'
                    closeIcon={<CloseOutlined data-test-id='modal-create-training-button-close' />}
                    className="training_modal"
                    open={true}
                    onCancel={handleCancel}
                    width={isMobile ? 312 : 264}
                    mask={false}
                    maskClosable={false}
                    style={isMobile ? { top: '25%' } : modalStyle}
                    footer={[
                        <Button
                            key='submit'
                            type='primary'
                            onClick={handleOk}
                            className="training_modal_button"
                            disabled={addButtonBlock}
                        >
                            Создать тренировку
                        </Button>,
                    ]}
                >
                    <div className="training_header_wrapper">
                        <h5 className="training_header_title">
                            Тренировка на {formateDate(date)}
                        </h5>
                        {isActiveTraining ? (
                            <p className="training_header_description">Нет активных тренировок</p>
                        ) : (
                            <span />
                        )}
                    </div>
                    <div className="training_modal_list_wrapper">
                        {!isActiveTraining ? (
                            <ul className='training_modal_list'>
                                {searchExercises.map((item: TrainingParams, index: number) => {
                                    const color = trainingList.find(
                                        (element) => element.name === item.name,
                                    );

                                    return (
                                        <li key={item._id} className="training_modal_list_item">
                                            <BadgeComponent
                                                name={item.name}
                                                color={color?.color}
                                                index={index}
                                                fontSize="12px"
                                                fontWeight="400"
                                                className={
                                                    item.isImplementation
                                                        ? 'title_disabled'
                                                        : 'title'
                                                }
                                            />
                                            <button
                                                className="edit_button"
                                                data-test-id={`modal-update-training-edit-button${index}`}
                                                disabled={item.isImplementation}
                                                onClick={
                                                    item.isImplementation
                                                        ? (e) => e.preventDefault()
                                                        : () => onChooseWorkout(item)
                                                }
                                            >
                                                <EditOutlined
                                                    className={
                                                        item.isImplementation
                                                            ? 'edit_svg_disabled'
                                                            : 'edit_svg'
                                                    }
                                                />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <img className="training_modal_icon" src={icon} alt="icon" />
                        )}
                    </div>
                </Modal>
            )}
            {addTrainingStatus === AddTrainingStatus.Error && (
                <AddErrorModal onClose={onCloseTrainingModal} />
            )}
            {openAddModal && (
                <AddTrainingModal
                    modalStyle={modalStyle}
                    onCloseAddModal={onCloseAddModal}
                    date={date}
                    addButtonBlock={addButtonBlock}
                />
            )}
            {openEditModal && (
                <SelectingWorkoutToEdit
                    modalStyle={modalStyle}
                    addButtonBlock={addButtonBlock}
                    onCloseEditModal={onCloseEditModal}
                    date={date}
                    onClose={handleCancel}
                    separateWorkout={separateWorkout}
                />
            )}
        </>
    );
};
