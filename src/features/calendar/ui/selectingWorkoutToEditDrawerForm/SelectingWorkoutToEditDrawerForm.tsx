import './selectingWorkoutToEditDrawerForm.css'
import {Button, Checkbox, Form, Input, InputNumber} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {TrainExercises} from "../../model/calendarSlice.ts";

type SelectingWorkoutToEditDrawerFormProps = {
    addItem: (value: any) => void
    setFormSubmit: any
    trainExercise: TrainExercises[]
    onClose: () => void
}

type ExerciseItem = {
    checkbox?: boolean
    name: string
    approaches: number
    weight: number
    replays: number
}

export const SelectingWorkoutToEditDrawerForm = (props: SelectingWorkoutToEditDrawerFormProps) => {
    const [form] = Form.useForm();
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [checkboxes, setCheckboxes] = useState([]);

    const initialValues = { exercise: props.trainExercise.length
            ? props.trainExercise.map(item => ({ ...item, checkbox: false }))  : [{}]}

    const onFinish = (values: any) => {
        const editedExercises = values.exercise.filter((item: ExerciseItem) => item.name && !item.checkbox)
        props.addItem(editedExercises)
    };
    useEffect(() => {
        props.setFormSubmit(form);
    }, [form, props.setFormSubmit]);

    const onChange = (_changedValues: any, allValues: any) => {
        const isRemoveButtonDisabled = !!allValues.exercise.find((item: ExerciseItem) => item?.checkbox);
        if (isRemoveButtonDisabled === componentDisabled) {
            setComponentDisabled(!isRemoveButtonDisabled)
        }
    };

    const removeValue = () => {
        const editedExercises = form.getFieldsValue()?.exercise?.filter((item: ExerciseItem) => !item.checkbox)
        form.setFieldsValue({exercise: editedExercises})
    }


    const handleCheckboxChange = (e, name) => {
        const checked = e.target.checked;
        setCheckboxes({...checkboxes, [name]: checked});
    };

    const someCheckbox = Object.values(checkboxes).some(value => value);
    return (
        <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className={'drawer_form_container'}
            initialValues={initialValues}

        >
            <Form.List name="exercise">
                {(fields, { add }) => (
                    <>
                        {fields.map(({ key, name, ...restField}, index) => (
                            <div key={key} className={'form_item'}>
                                <div>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        className={'input_name_exercise'}
                                    >
                                        <Input placeholder="Упражнение"
                                               autoFocus
                                               data-test-id={`modal-drawer-right-input-exercise${index}`}
                                               className={'input_name_exercise'} addonAfter={
                                            <Form.Item
                                            {...restField}
                                            name={[name, 'checkbox']}
                                            className={'input_checkbox_exercise_item'}
                                           valuePropName="checked"
                                        >
                                            <Checkbox className={'input_checkbox_exercise'}
                                                      data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                            onChange={handleCheckboxChange}/>
                                        </Form.Item>}/>
                                    </Form.Item>
                                </div>
                                <div className={'exercise_train_container'}>
                                    <div className={'exercise_approaches_wrapper'}>
                                        <div className={'exercise_block_title'}>Подходы</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className={'input_item'}

                                        >
                                            <InputNumber addonBefore="+" placeholder={'1'} className={'input_approaches_exercise'} min={1}
                                                         data-test-id={`modal-drawer-right-input-approach${index}`}
                                            />
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
                                                <InputNumber placeholder={'0'} className={'input_approaches_exercise'}
                                                             data-test-id={`modal-drawer-right-input-weight${index}`}
                                                             min={0}
                                                            />
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
                                                <InputNumber placeholder={'3'} className={'input_approaches_exercise'}
                                                             min={1}
                                                             data-test-id={`modal-drawer-right-input-quantity${index}`
                                                }/>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Form.Item>
                            <div className={'edit_button_group'}>
                                <Button type="dashed" onClick={() => add({checkbox: false})} block icon={<PlusOutlined />} className={'add_drawer_button'}>
                                    Добавить ещё
                                </Button>
                                <Button type="dashed"  block icon={<MinusOutlined />} onClick={removeValue} className={'delete_drawer_button'} disabled={!someCheckbox}>
                                    Удалить
                                </Button>
                            </div>

                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};
