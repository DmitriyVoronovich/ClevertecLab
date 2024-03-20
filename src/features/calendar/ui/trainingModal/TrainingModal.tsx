import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import icon from '../../../../accets/calendar-page/training_modal.svg';
import { BadgeComponent } from '../../../../common/components/badgeComponent/BadgeComponent.tsx';
import { AddTrainingStatus } from '../../../../common/enums/enums.ts';
import { isMobile } from '../../../../common/utils/isMobile.ts';
import { TrainingParams } from '../../model/types/types.ts';
import { AddErrorModal } from '../addErrorModal/AddErrorModal.tsx';
import { AddTrainingModal } from '../addTrainingModal/AddTrainingModal.tsx';
import { formateDate } from '../drawerModal/utils/formateDate.ts';
import { SelectingWorkoutToEdit } from '../selectingWorkoutToEdit/SelectingWorkoutToEdit.tsx';
import { TrainingModalProps } from './types/types.ts';
import { onChangeButtonBlock } from './utils/onChangeButtonBlock.ts';

import './trainingModal.css';

export const TrainingModal = ({ modalStyle, onCloseTrainingModal, date }: TrainingModalProps) => {
    const searchExercises = useAppSelector((state) => state.calendar.searchExercises);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [addButtonBlock, setAddButtonBlock] = useState<boolean>(false);
    const [separateWorkout, setSeparateWorkout] = useState<TrainingParams>({} as TrainingParams);

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
                    className={'training_modal'}
                    open={true}
                    onCancel={handleCancel}
                    width={isMobile() ? 312 : 264}
                    mask={false}
                    maskClosable={false}
                    style={isMobile() ? { top: '25%' } : modalStyle}
                    footer={[
                        <Button
                            key='submit'
                            type='primary'
                            onClick={handleOk}
                            className={'training_modal_button'}
                            disabled={addButtonBlock}
                        >
                            Создать тренировку
                        </Button>,
                    ]}
                >
                    <div className={'training_header_wrapper'}>
                        <h5 className={'training_header_title'}>
                            Тренировка на {formateDate(date)}
                        </h5>
                        {searchExercises.length === 0 ? (
                            <p className={'training_header_description'}>Нет активных тренировок</p>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className={'training_modal_list_wrapper'}>
                        {searchExercises.length !== 0 ? (
                            <ul className='training_modal_list'>
                                {searchExercises.map((item: TrainingParams, index: number) => {
                                    const color = trainingList.find(
                                        (element) => element.name === item.name,
                                    );
                                    return (
                                        <li key={item._id} className={'training_modal_list_item'}>
                                            <BadgeComponent
                                                name={item.name}
                                                color={color?.color}
                                                index={index}
                                                fontSize={'12px'}
                                                fontWeight={'400'}
                                                className={
                                                    item.isImplementation
                                                        ? 'title_disabled'
                                                        : 'title'
                                                }
                                            />
                                            <button
                                                className={'edit_button'}
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
                            <img className={'training_modal_icon'} src={icon} alt={'icon'} />
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
