import React, {useEffect, useState} from 'react';
import {DaySelectorData, PeriodicitySelectorData} from '@data/data.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Checkbox, DatePicker, Form, Select} from 'antd';
import Badge from 'antd/lib/badge';

import {AddTrainingDrawerFormProps} from './types/types.ts';
import {AddTrainingFormList} from './add-training-form-list';

import './add-training-drawer-form.css';



export const AddTrainingDrawerForm = ({
                                          setFormSubmit,
                                          onFinish,
                                          onUnDisabledSaveButton,
                                          onDisabledSaveButton
                                      }: AddTrainingDrawerFormProps) => {
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [selectTrain, setSelectTrain] = useState('');
    const [periodicityOpen, setPeriodicityOpen] = useState(false);
    const [periodicityValue, setPeriodicityValue] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        setFormSubmit(form);
    }, [form, setFormSubmit]);

    const handleChange = (value: any) => {
        const selectData = trainingList.find((item) => item.key === value)
        if (selectData?.name) {
            setSelectTrain(selectData.name);
        }
    };

    const onOpenPeriodicity = (e: any) => setPeriodicityOpen(e.target.checked);

    const onChangePeriodicity = () => setPeriodicityValue(data);

    const onFieldsChange = (_: any, allFields: any) => {
        const selectorField = allFields.find((field: {
            name: string[]
        }) => field.name[0] === 'selector');
        const nameField = allFields.find((field: { name: string[] }) => field.name[2] === 'name');
        const dateField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'date',
        );

        if (selectorField.value !== undefined && nameField.value !== undefined && dateField.value !== undefined) {
            onUnDisabledSaveButton()
        } else {
            onDisabledSaveButton()
        }
    };

    return (
        <Form
            form={form}
            autoComplete='off'
            className="training_form_container"
            onFinish={(values: any) => onFinish(values, periodicityOpen)}
            onFieldsChange={onFieldsChange}
        >
            <Form.Item name="selector">
                <Select
                    className="training_selector"
                    value={selectTrain}
                    placeholder="Выбор типа тренировки"
                    onChange={handleChange}
                    style={{width: '100%'}}
                    options={trainingList?.map((item) => ({
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
            </Form.Item>
            <div className='training_date_wrapper'>
                <Form.Item name="date">
                    <DatePicker className="training_date" format="DD.MM.YYYY"/>
                </Form.Item>
                <Form.Item name='repeat'>
                    <Checkbox className='training_checkbox' onChange={onOpenPeriodicity}>С
                        переодичностью</Checkbox>
                </Form.Item>
            </div>
            {periodicityOpen && <div className='training_date_wrapper'>
                <Form.Item name="period">
                    <Select
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
            <AddTrainingFormList/>
        </Form>
    );
};
