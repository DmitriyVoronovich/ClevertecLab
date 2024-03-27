import { Checkbox, Form, Input } from 'antd';

import { InputFormItemProps } from '../types/types.ts';

export const InputFormItem = ({
    name,
    handleCheckboxChange,
    index,
    restField,
}: InputFormItemProps) => (
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
    );
