import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, InputNumber} from 'antd';

import {AddTrainingFormListProps} from '../types/types.ts';

import './add-training-form-list.css';
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {InvitationToJointTraining} from "@enums/enums.ts";

export const AddTrainingFormList = ({onDisabledSaveButton}:AddTrainingFormListProps) => {
    const invitationMode = useAppSelector((state) => state.training.invitationMode);

    const invitationModeOn = invitationMode === InvitationToJointTraining.Invitation;
    const initialValue = [{}]

    return (
        <div className="form_list_wrapper">
        <Form.List name='exercise'  initialValue={initialValue}>
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
                                    className="list_name_exercise"
                                    data-test-id={`modal-drawer-right-input-exercise${index}`}
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
                                            addonBefore='+'
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
                        <Button
                            type='dashed'
                            onClick={() => {
                                add()
                                if ( !invitationModeOn) {
                                onDisabledSaveButton()}
                            }}
                            block={true}
                            icon={<PlusOutlined />}
                            className="add_drawer_button"
                        >
                            Добавить ещё упражнение
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
        </div>
    );
};
