import { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber } from 'antd';

import { ExerciseItem } from '../workout-edit-form/types/types.ts';

import { DrawerFormProps, FinishValues } from './types/types.ts';

import './drawer-form.css';

export const DrawerForm = ({ trainExercise, setFormSubmit, addItem }: DrawerFormProps) => {
    const [form] = Form.useForm();

    const initialValues = { exercise: trainExercise.length ? trainExercise : [{}] };

    const onFinish = (values: FinishValues) => {
        const item = values.exercise.filter((item: ExerciseItem) => item.name !== undefined || '');

        addItem(item);
    };

    useEffect(() => {
        setFormSubmit(form);
    }, [form, setFormSubmit]);

    return (
        <Form
            form={form}
            name='dynamic_form_nest_item'
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            autoComplete='off'
            className="drawer_form_container"
            initialValues={initialValues}
        >
            <Form.List name='exercise'>
                {(fields, { add }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <div key={key} className="form_item">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    className="input_name_exercise"
                                >
                                    <Input
                                        placeholder='Упражнение'
                                        className="input_name_exercise"
                                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                                    />
                                </Form.Item>
                                <div className="exercise_train_container">
                                    <div className="exercise_approaches_wrapper">
                                        <div className="exercise_block_title">Подходы</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className="input_item"
                                        >
                                            <InputNumber
                                                addonBefore='+'
                                                placeholder="1"
                                                className="input_approaches_exercise"
                                                min={1}
                                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="exercise_weight_wrapper">
                                        <div className="exercise_weight">
                                            <div className="exercise_block_title">Вес, кг</div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'weight']}
                                                className="input_item"
                                            >
                                                <InputNumber
                                                    placeholder="0"
                                                    className="input_approaches_exercise"
                                                    min={0}
                                                    data-test-id={`modal-drawer-right-input-weight${index}`}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="multiplication_sign">x</div>
                                        <div className="exercise_quantity">
                                            <div className="exercise_block_title">Количество</div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'replays']}
                                                className="input_item"
                                            >
                                                <InputNumber
                                                    placeholder="3"
                                                    className="input_approaches_exercise"
                                                    min={1}
                                                    data-test-id={`modal-drawer-right-input-quantity${index}`}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Form.Item>
                            <Button
                                type='dashed'
                                onClick={() => add()}
                                block={true}
                                icon={<PlusOutlined />}
                                className="add_drawer_button"
                            >
                                Добавить ещё
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};
