import './registration-form.css'
import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined} from "@ant-design/icons";

export const RegistrationForm = () => {

    const onFinish = (values: string) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="registration-form"
            onFinish={onFinish}
        >
            <div className={'registration_form_section'}>
                <Form.Item
                    className={'ant-fom-item'}
                    name="email"
                    rules={[{ required: true, message: 'Please input your e-mail!' }]}
                >
                    <Input className={'ant-fom-item-email'} addonBefore="e-mail:" />
                </Form.Item>
                <Form.Item
                    className={'ant-fom-item'}
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        className={'ant-fom-item-password'}
                        placeholder="Пароль"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <span className={'registration_password_message'}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                <Form.Item
                    className={'ant-fom-item'}
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        className={'ant-fom-item-password'}
                        placeholder="Повторите пароль"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
            </div>

            <Form.Item className={'form-item-button'}>
                <Button type="primary" htmlType="submit" className="registration-form-button">
                    Войти
                </Button>
            </Form.Item>
            <Form.Item className={'ant-fom-item-button-g'}>
                <Button
                    type="default"
                    className="google-registration-button"
                    icon={<GooglePlusOutlined />}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
