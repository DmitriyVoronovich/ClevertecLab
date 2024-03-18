import {Drawer} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import './darwelModal.css'
import Badge from "antd/lib/badge";
import {formateDate} from "./utils/formateDate.ts";
import {DrawerForm} from "../drawerForm/DrawerForm.tsx";
import {FormInstance} from "antd/es/form/hooks/useForm";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {TrainExercises} from "../../model/calendarSlice.ts";

type DrawerModalProps = {

    onDrawerModalClose: () => void
    selectTrain: string
    date: string
    onAddTrainExercise: (train: TrainExercises[]) => void
    trainExercise: TrainExercises[]
}

const transformValueToTrain = (value: TrainExercises[]) => value.map((item) => {
    return {
        name: item.name || '',
        replays: item.replays ? item.replays : 1,
        weight: item.weight ? item.weight : 0,
        approaches: item.approaches ? item.approaches : 1,
        isImplementation: false
    }
});

export const DrawerModal: React.FC<DrawerModalProps> = (
    {onAddTrainExercise, onDrawerModalClose, date, selectTrain, trainExercise}
) => {
    const trainingList = useAppSelector(state => state.calendar.trainingList);
    const [form, setForm] = useState<FormInstance>();

    const screenWidth = window.innerWidth;
    const train = trainingList.find((item) => item.key === selectTrain)

    const addItem = (value: TrainExercises[]) => {
        const transformTrainValues = transformValueToTrain(value);
        onAddTrainExercise(transformTrainValues)
    }

    const onClose = () => {
        onDrawerModalClose();
        form?.submit();
        setTimeout(() => form?.resetFields(), 1000);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title="Добавление упражнений"
            placement={screenWidth > 361 ? 'right' : 'bottom'}
            height={screenWidth < 361 && 555}
            width={408}
            open={true}
            onClose={onClose}
            mask={false}
            maskClosable={false}
            className={'drawer_container'}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close'/>}
            extra={
                <PlusOutlined style={{width: '14px', height: '14px'}}/>
            }
        >
            <div className={'info_section'}>
                {train ?
                    <Badge color={train.color} text={train.name} style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '130%',
                        color: '#8C8C8C'
                    }}/>
                    : <></>}
                <span className={'info_date'}>{formateDate(date)}</span>
            </div>
            <DrawerForm addItem={addItem} setFormSubmit={setForm}
                        trainExercise={trainExercise}/>
        </Drawer>
    );
};
