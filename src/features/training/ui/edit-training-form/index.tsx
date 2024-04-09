import React, {useEffect, useState} from 'react';
import {DaySelectorData, PeriodicitySelectorData} from '@data/data.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Checkbox, DatePicker, Form, Select} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import moment from 'moment';

import {EditTrainingFormProps} from './types/types.ts';
import {EditTrainingFormList} from './edit-training-form-list';
import {ExerciseItem} from "../../../calendar/ui/workout-edit-form/types/types.ts";


export const EditTrainingForm = ({
                                     setFormSubmit,
                                     onUnDisabledEditButton,
                                     onFinish,
                                     separateWorkout
                                 }: EditTrainingFormProps) => {
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [selectTrain, setSelectTrain] = useState('');
    const [periodicityOpen, setPeriodicityOpen] = useState(false);
    const [periodicityValue, setPeriodicityValue] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        setFormSubmit(form);
    }, [form, setFormSubmit]);

    const initialValues = {
        selector: separateWorkout.name,
        date: moment(separateWorkout.date),
        repeat: separateWorkout.parameters.repeat,
        period: separateWorkout.parameters.period,
        exercise: separateWorkout.exercises
    };

    const handleChange = (value: any) => {
        const selectData = trainingList.find((item) => item.key === value)

        if (selectData?.name) {
            setSelectTrain(selectData.name);
        }
    };



    const removeValue = () => {
        const editedExercises = form
            .getFieldsValue()
            ?.exercise?.filter((item: ExerciseItem) => !item.checkbox);

        form.setFieldsValue({ exercise: editedExercises });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const {checked} = e.target;

        setCheckboxes({ ...checkboxes, [name]: checked });
    };

    const someCheckbox = Object.values(checkboxes).some((value) => value);


    const onOpenPeriodicity = (e: CheckboxChangeEvent) => setPeriodicityOpen(e.target.checked);

    const onChangePeriodicity = (data: any) => setPeriodicityValue(data);

    const onFieldsChange = () => onUnDisabledEditButton();

    return (
        <Form
            form={form}
            autoComplete='off'
            className="training_form_container"
            onFinish={(values: any) => onFinish(values)}
            onFieldsChange={onFieldsChange}
            initialValues={initialValues}
        >
            <Form.Item name="selector">
                <Select
                    className="training_selector"
                    value={selectTrain}
                    placeholder="Выбор типа тренировки"
                    onChange={handleChange}
                    style={{width: '100%'}}
                />
            </Form.Item>
            <div className='training_date_wrapper'>
                <Form.Item name="date">
                    <DatePicker className="training_date" format="DD.MM.YYYY" data-test-id='modal-drawer-right-date-picker' />
                </Form.Item>
                <Form.Item name='repeat'>
                    <Checkbox className='training_checkbox' onChange={onOpenPeriodicity} data-test-id='modal-drawer-right-checkbox-period'>С
                        переодичностью</Checkbox>
                </Form.Item>
            </div>
            {periodicityOpen && <div className='training_date_wrapper'>
                <Form.Item name="period">
                    <Select
                        data-test-id='modal-drawer-right-select-period'
                        onChange={onChangePeriodicity}
                        className="training_selector"
                        style={{width: '156px'}}
                        placeholder='Через 1 день'
                        options={PeriodicitySelectorData.map((item) => ({
                            value: item.key,
                            label: (
                                <span className='date_title'>{item.title}</span>
                            ),
                        }))}
                    />
                </Form.Item>
                {periodicityValue && <Form.Item name="day">
                    <Select
                        className="training_selector"
                        style={{width: '156px'}}
                        defaultValue='Понедельник'
                        options={DaySelectorData.map((item) => ({
                            value: item.key,
                            label: (
                                <span className='date_title'>{item.title}</span>
                            ),
                        }))}
                    />
                </Form.Item>}
            </div>}
            <EditTrainingFormList removeValue={removeValue} handleCheckboxChange={handleCheckboxChange} someCheckbox={someCheckbox}/>
        </Form>
    );
};
