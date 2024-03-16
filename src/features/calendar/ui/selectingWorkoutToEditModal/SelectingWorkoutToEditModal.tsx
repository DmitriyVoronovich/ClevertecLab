import React, {useState} from "react";
import {Button, Modal, Select} from "antd";
import {ArrowLeftOutlined, EditOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import '../addTrainingModal/addTrainingModal.css';
import Badge from "antd/lib/badge";
import {DrawerModal} from "../drawerModal/DrawerModal.tsx";
import {calendarThunks, TrainExercises, TrainingParams} from "../../model/calendarSlice.ts";
import {
    SelectingWorkoutToEditDrawerModal
} from "../selectingWorkoutToEditDrawerModal/SelectingWorkoutToEditDrawerModal.tsx";

type SelectingWorkoutToEditModalProps = {
    onCloseEditModal: () => void
    modalStyle: {
        left: number
        top: number
    }
    date: string
    onClose: () => void
    separateWorkout: TrainingParams
    addButtonBlock: boolean
}

export const SelectingWorkoutToEditModal: React.FC<SelectingWorkoutToEditModalProps> = (props) => {
    const {
        date,
        onCloseEditModal,
        modalStyle,
        separateWorkout,
        addButtonBlock
    } = props;
    const dispatch = useAppDispatch();
    const searchExercises = useAppSelector(state => state.calendar.searchExercises);
    const addTrainingStatus = useAppSelector(state => state.calendar.addTrainingStatus);
    const trainingList = useAppSelector(state => state.calendar.trainingList);
    const [openEditDrawerModal, setOpenEditDrawerModal] = useState(false);
    const [openDrawerModal, setOpenDrawerModal] = useState(false);
    const [selectTrain, setSelectTrain] = useState(separateWorkout.name);
    const [trainExercise, setTrainExercise] = useState<TrainExercises[]>(separateWorkout.exercises);

    const selectedTrainingItem = trainingList.find((item) => item.name === separateWorkout.name)
    const list = trainingList.reduce((acm, trainingListItem) => {
        if (!searchExercises.find(searchItem => searchItem.name === trainingListItem.name)) {
            acm.push(trainingListItem)
        }
        return acm;
    }, [selectedTrainingItem])

    const screenWidth = window.innerWidth;

    const handleOk = () => {
        setOpenDrawerModal(true)
    };


    const handleChange = (value: string) => {
        setSelectTrain(value)
        if (value === selectedTrainingItem?.key) {
            setTrainExercise(separateWorkout.exercises)
        } else {
            setTrainExercise([])
        }
    };

    const handleSave = () => {

        if (selectTrain === selectedTrainingItem?.name) {

            const trainArg = {
                name: separateWorkout?.name || '',
                date: date,
                isImplementation: !!addButtonBlock,
                parameters: {
                    repeat: false,
                    period: 1,
                    jointTraining: false,
                    participants: []
                },
                exercises: trainExercise
            }
            dispatch(calendarThunks.editTraining({
                training: trainArg,
                trainingId: separateWorkout._id
            }));
            onCloseEditModal();
        } else {
            const trainName = trainingList.find((item) => item.key === selectTrain)

            const trainArg = {
                name: trainName?.name || '',
                date: date,
                isImplementation: false,
                parameters: {
                    repeat: false,
                    period: 1,
                    jointTraining: false,
                    participants: []
                },
                exercises: trainExercise
            }
            onCloseEditModal()
            dispatch(calendarThunks.addTraining(trainArg))
        }


    };

    const handleCancel = () => {
        onCloseEditModal();
    };

    const onDrawerModalClose = () => {
        setOpenDrawerModal(false)
    };

    const onEditDrawerModalClose = () => {
        setOpenEditDrawerModal(false)
    };

    const onAddTrainExercise = (train: TrainExercises[]) => {
        setTrainExercise(train)
    };

    const onEditDrawerModalOpen = () => {
        setOpenEditDrawerModal(true)
    };


    return (
        <>

            <Modal
                data-test-id='modal-create-exercise'
                className={'add_training_modal'}
                open={true}
                width={screenWidth < 361 ? 312 : 264}
                mask={false}
                maskClosable={false}
                closable={false}
                style={screenWidth > 361 ? modalStyle : {top: '25%'}}
                footer={[
                    <Button key="save" type="default" onClick={handleOk}
                            className={'add_training_modal_button'}
                            disabled={addButtonBlock}>
                        Добавить упражнение
                    </Button>,
                    <Button key="submit" type="default" onClick={handleSave}
                            disabled={trainExercise?.length === 0 && selectTrain !== selectedTrainingItem?.name}
                            className={'save_training_modal_button'}
                            loading={addTrainingStatus === 'loading'}>
                        {addButtonBlock ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                ]}
            >
                <div className={'add_training_header_wrapper'}>
                    <ArrowLeftOutlined style={{width: '14px', height: '14px'}}
                                       onClick={handleCancel}
                                       data-test-id='modal-exercise-training-button-close'/>
                    <Select
                        data-test-id='modal-create-exercise-select'
                        className={'add_training_selector'}
                        defaultValue={{
                            value: selectedTrainingItem.key,
                            label: <Badge color={selectedTrainingItem.color}
                                          text={selectedTrainingItem.name}
                                          style={{
                                              fontWeight: '500',
                                              fontSize: '14px',
                                              lineHeight: '130%'
                                          }}/>
                        }}

                        onChange={handleChange}
                        style={{width: '100%'}}
                        options={list.map((item) => ({
                            value: item.key,
                            label: <Badge key={item._id} color={item.color} text={item.name}
                                          style={{
                                              fontWeight: '500',
                                              fontSize: '14px',
                                              lineHeight: '130%'
                                          }}/>
                        }))}
                    />

                </div>
                <div className={'add_training_modal_list_wrapper'}>
                    {trainExercise.length === 0 ?
                        <div className={'add_training_modal_none_list'}></div>
                        : <ul className={'add_training_modal_list'}>

                            {trainExercise.map((item, index) => {
                                return (
                                    <li key={item.name} className={'add_training_modal_list_item'}>
                                        <div
                                            className={'add_training_modal_title'}>{item.name}</div>
                                        <EditOutlined
                                            onClick={onEditDrawerModalOpen}
                                            className={'edit_svg'}
                                            data-test-id={`modal-update-training-edit-button${index}`}
                                        />
                                    </li>
                                )
                            })
                            }
                        </ul>}
                </div>
            </Modal>
            {openDrawerModal && <DrawerModal onDrawerModalClose={onDrawerModalClose}
                                             selectTrain={selectTrain}
                                             date={date}
                                             onAddTrainExercise={onAddTrainExercise}
                                             trainExercise={trainExercise}/>}
            {openEditDrawerModal && <SelectingWorkoutToEditDrawerModal open={openEditDrawerModal}
                                                                       selectedTrainingItem={selectedTrainingItem}
                                                                       onEditDrawerModalClose={onEditDrawerModalClose}
                                                                       separateWorkout={separateWorkout}
                                                                       date={date}
                                                                       onAddTrainExercise={onAddTrainExercise}/>}

        </>

    );
};
