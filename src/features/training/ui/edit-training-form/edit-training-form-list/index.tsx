import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, InputNumber} from 'antd';
import React from "react";


type EditTrainingFormListProps = {
    removeValue: () => void
    handleCheckboxChange: (e: any, name: string) => void
    someCheckbox: boolean
}

export const EditTrainingFormList = ({removeValue, someCheckbox, handleCheckboxChange}:EditTrainingFormListProps) => (
        <div className="form_list_wrapper">
            <Form.List name='exercise' >
                {(fields, { add }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <div key={key} className="form_item">
                                <Form.Item {...restField} name={[name, 'name']} className="input_name_exercise">
                                    <Input
                                        placeholder='Упражнение'
                                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                                        className="input_name_exercise"
                                        addonAfter={
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'checkbox']}
                                                className="input_checkbox_exercise_item"
                                                valuePropName='checked'
                                            >
                                                <Checkbox
                                                    className="input_checkbox_exercise"
                                                    data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </Form.Item>
                                        }
                                    />
                                </Form.Item>
                                <div className="exercise_train_container">
                                    <div className="exercise_approaches_wrapper">
                                        <div className="exercise_block_title">Подходы</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className="list_item"
                                        >
                                            <InputNumber
                                                // addonBefore='+'
                                                placeholder="1"
                                                className="list_approaches_exercise"
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
                                                className="list_item"
                                            >
                                                <InputNumber
                                                    placeholder="0"
                                                    className="list_approaches_exercise"
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
                                                className="list_item"
                                            >
                                                <InputNumber
                                                    placeholder="3"
                                                    className="list_approaches_exercise"
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
                            <div className="edit_button_group">
                                <Button
                                    type='dashed'
                                    onClick={() => add({checkbox: false})}
                                    block={true}
                                    icon={<PlusOutlined/>}
                                    className="add_drawer_button"
                                >
                                    Добавить ещё
                                </Button>
                                <Button
                                    type='dashed'
                                    block={true}
                                    icon={<MinusOutlined/>}
                                    onClick={removeValue}
                                    className="delete_drawer_button"
                                    disabled={!someCheckbox}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </div>
);
