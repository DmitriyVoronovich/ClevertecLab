import {Button, Modal} from "antd";
import icon from '../../../../accets/calendar-page/training_modal.svg'
import './trainingModal.css';
import {AddTrainingModal} from "../addTrainingModal/AddTrainingModal.tsx";
import React, {useEffect, useState} from "react";
import {formateDate} from "../drawerModal/utils/formateDate.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import Badge from "antd/lib/badge";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {
    SelectingWorkoutToEditModal
} from "../selectingWorkoutToEditModal/SelectingWorkoutToEditModal.tsx";
import {TrainingParams} from "../../model/calendarSlice.ts";
import {ViewWorkouts} from "../viewWorkouts/ViewWorkouts.tsx";
import {AddErrorModal} from "../addErrorModal/AddErrorModal.tsx";

type TrainingModalProps = {
    onClose: () => void
    modalStyle: {
        left: number
        top: number
    }
    date: string
}


export const TrainingModal = (props: TrainingModalProps) => {
    const searchExercises = useAppSelector(state => state.calendar.searchExercises)
    const addTrainingStatus = useAppSelector(state => state.calendar.addTrainingStatus);
    const trainingList = useAppSelector(state => state.calendar.trainingList)
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [addButtonBlock, setAddButtonBlock] = useState<boolean>(false);
    const [separateWorkout, setSeparateWorkout] = useState<TrainingParams>({})
    const [openViewWorkouts, setOpenViewWorkouts] = useState(false);

    useEffect(() => {
        const today = new Date(props.date);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const time = tomorrow.getTime();

        if (today.getTime() < time || searchExercises.length > 4) {
            setAddButtonBlock(true)
        } else {
            setAddButtonBlock(false)
        }
    });
    const screenWidth = window.innerWidth;
    const handleOk = () => {
        setOpenAddModal(true)
    };

    const handleCancel = () => {
        props.onClose()
    };

    const onCloseAddModal = () => {
        setOpenAddModal(false)
    }

    const onCloseEditModal = () => {
        setOpenEditModal(false)
    }

    const onChooseWorkout = (item: TrainingParams) => {
        setSeparateWorkout(item);
        setOpenEditModal(true);
    }

    const onViewWorkoutsClose = () => {
        setOpenViewWorkouts(!openViewWorkouts)
    }

    return (
        <>
            {!openAddModal && !openEditModal && <Modal
                data-test-id='modal-create-training'
                closeIcon={<CloseOutlined data-test-id='modal-create-training-button-close'/>}
                className={'training_modal'}
                open={true}
                onCancel={handleCancel}
                width={screenWidth< 361 ? 312 : 264}
                mask={false}
                maskClosable={false}
                style={screenWidth > 361 ? props.modalStyle : {top: '25%'}}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}
                            className={'training_modal_button'} disabled={addButtonBlock}>
                        {'Создать тренировку'}
                    </Button>
                ]}
            >
                <div className={'training_header_wrapper'}>
                    <h5 className={'training_header_title'}>Тренировка
                        на {formateDate(props.date)}</h5>
                    {searchExercises.length === 0 ?
                        <p className={'training_header_description'}>Нет активных тренировок</p> :
                        <span></span>}
                </div>
                <div className={'training_modal_list_wrapper'}>
                    {searchExercises.length !== 0 ?
                        <ul className="training_modal_list">
                            {searchExercises.map((item: any, index: number) => {
                                const color = trainingList.find(element => element.name === item.name)
                                return (<li key={item._id} className={'training_modal_list_item'}
                                >
                                    <Badge color={color?.color} text={item.name} style={{
                                        fontWeight: '400',
                                        fontSize: '12px',
                                        lineHeight: '130%',
                                    }}
                                           className={item.isImplementation ? 'title_disabled' : 'title'}/>
                                    <button className={'edit_button'}
                                        data-test-id={`modal-update-training-edit-button${index}`}
                                        disabled={item.isImplementation}
                                        onClick={item.isImplementation ? (e) => e.preventDefault() : () => onChooseWorkout(item)}
                                    >
                                        <EditOutlined className={item.isImplementation ? 'edit_svg_disabled' : 'edit_svg'}/>
                                    </button>
                                </li>)
                            })}
                        </ul>
                        : <img className={'training_modal_icon'} src={icon} alt={'icon'}/>}
                </div>
            </Modal>}
            {addTrainingStatus === 'error' && <AddErrorModal onClose={props.onClose}/>}
            {openAddModal && <AddTrainingModal modalStyle={props.modalStyle}
                                               onCloseAddModal={onCloseAddModal} date={props.date}
                                               onClose={handleCancel}
                                               addButtonBlock={addButtonBlock}/>}
            {openEditModal && <SelectingWorkoutToEditModal modalStyle={props.modalStyle}
                                                           addButtonBlock={addButtonBlock}
                                                           onCloseEditModal={onCloseEditModal}
                                                           date={props.date}
                                                           onClose={handleCancel}
                                                           separateWorkout={separateWorkout}/>}
            {openViewWorkouts && <ViewWorkouts open={openViewWorkouts}
                                               onViewWorkoutsClose={onViewWorkoutsClose}
                                               separateWorkout={separateWorkout}
                                               date={props.date}/>}
        </>

    );
};
