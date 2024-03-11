import './drawerForm.css'
import {Button, Form, Input, InputNumber} from "antd";
import { PlusOutlined} from "@ant-design/icons";
import {useEffect} from "react";

type DrawerFormProps = {
    addItem: (value: any) => void
    setFormSubmit: any
}

export const DrawerForm = (props: DrawerFormProps) => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        props.addItem(values)
    };
    useEffect(() => {
        props.setFormSubmit(form);
    }, [form, props.setFormSubmit]);
    return (
        <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className={'drawer_form_container'}
        >
            <Form.List name="users">
                {(fields, { add }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className={'form_item'}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    rules={[{ required: true, message: 'Missing exercise name' }]}
                                    className={'input_name_exercise'}
                                >
                                    <Input placeholder="Упражнение" className={'input_name_exercise'}/>
                                </Form.Item>
                                <div className={'exercise_train_container'}>
                                    <div className={'exercise_approaches_wrapper'}>
                                        <div className={'exercise_block_title'}>Подходы</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className={'input_item'}
                                        >
                                            <InputNumber addonBefore="+" placeholder={'1'} className={'input_approaches_exercise'} min={1}/>
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
                                                <InputNumber placeholder={'0'} className={'input_approaches_exercise'} min={0}/>
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
                                                <InputNumber placeholder={'3'} className={'input_approaches_exercise'} min={1}/>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className={'add_drawer_button'}>
                                Добавить еще
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};
