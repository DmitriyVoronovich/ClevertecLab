import {Drawer, Form, Input, InputNumber} from "antd";
import '../drawerModal/darwelModal.css'
import '../drawerForm/drawerForm.css'
import Badge from "antd/lib/badge";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import { TrainingParams} from "../../model/calendarSlice.ts";
import {formateDate} from "../drawerModal/utils/formateDate.ts";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";

type ViewWorkoutsProps = {
    open: boolean
    onViewWorkoutsClose: () => void
    separateWorkout: TrainingParams
    date: string
}

export const ViewWorkouts: React.FC<ViewWorkoutsProps> = (
    {open, onViewWorkoutsClose, date, separateWorkout}
) => {
    const trainingList = useAppSelector(state => state.calendar.trainingList);

    const screenWidth = window.innerWidth;
    const train = trainingList.find((item) => item.name === separateWorkout.name)

    const initialValues = {exercise: separateWorkout.exercises.length ? separateWorkout.exercises : [{}]}

    const onClose = () => {
        onViewWorkoutsClose();
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title="Просмотр упражнений"
            width={408}
            onClose={onClose}
            open={open}
            placement={screenWidth >361 ? 'right' : 'bottom'}
            height={screenWidth <361 && 555}
            mask={false}
            maskClosable={false}
            className={'drawer_container'}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close'/>}
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
            <Form
                name="dynamic_form_nest_item"
                style={{maxWidth: 600}}
                autoComplete="off"
                className={'drawer_form_container'}
                initialValues={initialValues}
            >
                <Form.List name="exercise">
                    {(fields, { add }) => (
                        <>
                        {fields.map(({key, name, ...restField}, index) => (
                            <div key={key} className={'form_item'}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    className={'input_name_exercise'}
                                >
                                    <Input className={'input_name_exercise'} disabled={true} data-test-id={`modal-drawer-right-input-exercise${index}`}/>
                                </Form.Item>
                                <div className={'exercise_train_container'}>
                                    <div className={'exercise_approaches_wrapper'}>
                                        <div className={'exercise_block_title'}>Подходы</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className={'input_item'}
                                        >
                                            <InputNumber addonBefore="+"
                                                         className={'input_approaches_exercise'}
                                                         disabled={true}
                                                         data-test-id={`modal-drawer-right-input-approach${index}`}/>
                                        </Form.Item>
                                    </div>
                                    <div className={'exercise_weight_wrapper'}>
                                        <div className={'exercise_weight'}>
                                            <div className={'exercise_block_title'}>Вес, кг</div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'weight']}
                                                className={'input_item'}
                                            >
                                                <InputNumber className={'input_approaches_exercise'}
                                                             disabled={true}
                                                             data-test-id={`modal-drawer-right-input-weight${index}`}/>
                                            </Form.Item>
                                        </div>
                                        <div className={'multiplication_sign'}>x</div>
                                        <div className={'exercise_quantity'}>
                                            <div className={'exercise_block_title'}>Количество</div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'replays']}
                                                className={'input_item'}
                                            >
                                                <InputNumber className={'input_approaches_exercise'}
                                                             disabled={true}
                                                             data-test-id={`modal-drawer-right-input-quantity${index}`}/>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>)}
                </Form.List>
            </Form>
        </Drawer>
    );
};
