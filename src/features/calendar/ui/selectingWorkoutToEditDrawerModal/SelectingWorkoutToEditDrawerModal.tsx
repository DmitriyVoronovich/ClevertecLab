import {Drawer} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import '../drawerModal/darwelModal.css'
import Badge from "antd/lib/badge";
import {formateDate} from "../drawerModal/utils/formateDate.ts";
import {FormInstance} from "antd/es/form/hooks/useForm";
import {TrainExercises, TrainingParams} from "../../model/calendarSlice.ts";
import {
    SelectingWorkoutToEditDrawerForm
} from "../selectingWorkoutToEditDrawerForm/SelectingWorkoutToEditDrawerForm.tsx";

type SelectingWorkoutToEditDrawerModalProps = {
    open: boolean
    onEditDrawerModalClose: () => void
    separateWorkout: TrainingParams
    date: string
    onAddTrainExercise: (train: TrainExercises[]) => void
    selectedTrainingItem: any
}
const transformValueToTrain = (value: any) => value.map((item: any) => {
    const str = 'Прыжки с нагрузкой'
        return {
            name: str.includes(item.name) ? str : item.name,
            replays: item.replays ? item.replays : 1,
            weight: item.weight ? item.weight : 0,
            approaches: item.approaches ? item.approaches : 1,
            isImplementation: false
        }
});
export const SelectingWorkoutToEditDrawerModal: React.FC<SelectingWorkoutToEditDrawerModalProps> = (
    {open, onAddTrainExercise, onEditDrawerModalClose, date, separateWorkout, selectedTrainingItem}
) => {

    const [form, setForm] = useState<FormInstance>();

    const screenWidth = window.innerWidth;
    const addItem = (value: TrainExercises[]) => {
        const transformTrainValues = transformValueToTrain(value);
        onAddTrainExercise(transformTrainValues)
    }

    const onClose = () => {
        onEditDrawerModalClose();
        form?.submit();
        setTimeout(() => form?.resetFields(), 1000);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title="Редактирование"
            width={408}
            height={screenWidth <361 && 555}
            onClose={onClose}
            open={open}
            mask={false}
            placement={screenWidth >361 ? 'right' : 'bottom'}
            maskClosable={false}
            className={'drawer_container'}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close'/>}
            extra={
                <EditOutlined style={{width: '14px', height: '14px'}}/>
            }
        >
            <div className={'info_section'}>
                {selectedTrainingItem ?
                    <Badge color={selectedTrainingItem.color} text={selectedTrainingItem.name} style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '130%',
                        color: '#8C8C8C'
                    }}/>
                    : <></>}
                <span className={'info_date'}>{formateDate(date)}</span>
            </div>
            <SelectingWorkoutToEditDrawerForm addItem={addItem} setFormSubmit={setForm}
                        trainExercise={separateWorkout.exercises} onClose={onClose}/>
        </Drawer>
    );
};
