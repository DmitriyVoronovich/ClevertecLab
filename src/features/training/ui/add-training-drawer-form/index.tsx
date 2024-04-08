import {useEffect, useState} from 'react';
import {BadgeComponent} from '@components/badge-component';
import {DaySelectorData, PeriodicitySelectorData} from '@data/data.ts';
import {InvitationToJointTraining} from '@enums/enums.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import avatar from '@image/feedback-page/default_avatar.svg';
import {Avatar, Checkbox, DatePicker, Form, Select} from 'antd';
import Badge from 'antd/lib/badge';

import {AddTrainingDrawerFormProps} from './types/types.ts';
import {AddTrainingFormList} from './add-training-form-list';

import './add-training-drawer-form.css';


export const AddTrainingDrawerForm = ({
                                          setFormSubmit,
                                          onFinish,
                                          onUnDisabledSaveButton,
                                          onDisabledSaveButton,
                                          user
                                      }: AddTrainingDrawerFormProps) => {
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const invitationMode = useAppSelector((state) => state.training.invitationMode);
    const [selectTrain, setSelectTrain] = useState('');
    const [periodicityOpen, setPeriodicityOpen] = useState(false);
    const [periodicityValue, setPeriodicityValue] = useState(false);

    const [form] = Form.useForm();
    const invitationModeOn = invitationMode === InvitationToJointTraining.Invitation;
    const name = user?.name.split(' ');
    const secondName = user?.name.split(' ');

    useEffect(() => {
        setFormSubmit(form);
    }, [form, setFormSubmit]);

    const onDeterminingWorkoutType = (value: string) => {
        return trainingList.find((item) => item.name === value)
    }

    const train = (onDeterminingWorkoutType(user?.trainingType))

    const disabledDate = (current: any) => {
        return current && current < Date.now();
    }

    const handleChange = (value: any) => {
        const selectData = trainingList.find((item) => item.key === value)

        if (selectData?.name) {
            setSelectTrain(selectData.name);
        }
    };

    const onOpenPeriodicity = (e: any) => setPeriodicityOpen(e.target.checked);

    const onChangePeriodicity = (e: any) => {
        setPeriodicityValue(e);
    }

    const onFieldsChange = (_: any, allFields: any) => {
        const selectorField = allFields.find((field: {
            name: string[]
        }) => field.name[0] === 'selector');
        const nameField = allFields.find((field: { name: string[] }) => field.name[2] === 'name');
        const dateField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'date',
        );
        if (invitationModeOn) {
            if (nameField.value !== undefined && dateField.value !== undefined) {
                onUnDisabledSaveButton()
            } else {
                onDisabledSaveButton()
            }
        } else if (selectorField.value !== undefined && nameField.value !== undefined && dateField.value !== undefined) {
            onUnDisabledSaveButton()
        } else {
            onDisabledSaveButton()
        }

    };

    function getOptions() {
        return PeriodicitySelectorData.map((item) => ({
            value: item.key,
            label: (
                <span className='date_title'>{item.title}</span>
            ),
        }));
    }

    return (
        <Form
            form={form}
            autoComplete='off'
            className="training_form_container"
            onFinish={(values: any) => onFinish(values, periodicityOpen)}
            onFieldsChange={onFieldsChange}
        >
            {invitationModeOn
                ? <div className='invite_card_wrapper'>
                    <div className='invite_card_header_wrapper'>
                        <Avatar size={42} src={user?.imageSrc ? user.imageSrc : avatar}/>
                        <h6 className='card_header_title'>
                            {name[0]}
                            {secondName[1] && <br/>}
                            {secondName[1]}
                        </h6>
                    </div>
                    <BadgeComponent name={train?.name} color={train?.color} fontWeight="500" fontSize='14px' colorText='#8C8C8C' className='' index={1}/>
                </div>
                : <Form.Item name="selector">
                    <Select
                        data-test-id='modal-create-exercise-select'
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
                </Form.Item>}
            <div className='training_date_wrapper'>
                <Form.Item name="date">
                    <DatePicker className="training_date" format="DD.MM.YYYY" disabledDate={disabledDate} data-test-id='modal-drawer-right-date-picker'/>
                </Form.Item>
                <Form.Item name='repeat'>
                    <Checkbox className='training_checkbox' data-test-id='modal-drawer-right-checkbox-period' onChange={onOpenPeriodicity}>С
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
                        options={getOptions()}
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
