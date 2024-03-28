import { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Checkbox, Form, Input } from 'antd';

import { authThunks } from '../../model/auth-slice.ts';
import { onValidatePassword } from '../change-password/utils/on-validate-password.ts';

import { FormParams } from './types/types.ts';
import { onValidateEmail } from './utils/on-confirm-email.ts';

import './login-form.css';

export const LoginForm = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isRepeatButtonDisabled, setIsRepeatButtonDisabled] = useState(true);
    const [isEmailLogin, setIsEmailLogin] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const onFinish = (values: FormParams) => {
        if (isPasswordValid) {
            dispatch(authThunks.login(values));
        }
    };

    const validateEmail = onValidateEmail(setIsRepeatButtonDisabled);

    const validatePassword = onValidatePassword(setIsPasswordValid);

    const confirmEmail = () => {
        if (!isRepeatButtonDisabled) {
            localStorage.setItem('email', JSON.stringify(isEmailLogin));
            dispatch(authThunks.checkEmail(isEmailLogin));
        }
    };

    const onGoogleLogIn = () =>
        (window.location.href = 'https://marathon-api.clevertec.ru/auth/google');

    const onFieldsChange = (_: any, allFields: any) => {
        const emailField = allFields.find((field: { name: string[] }) => field.name[0] === 'email');
        const passwordField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'password',
        );

        if (emailField) {
            setIsEmailLogin(emailField.value);
            setIsRepeatButtonDisabled(true);
            form.setFields([
                {
                    name: 'email',
                    errors: validateEmail(emailField.value) ? [] : [''],
                },
            ]);
        }
        if (passwordField) {
            form.setFields([
                {
                    name: 'password',
                    errors: validatePassword(passwordField.value) ? [] : [''],
                },
            ]);
        }
    };

    return (
        <Form
            form={form}
            name='normal_login'
            className='login-form'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
        >
            <div className="login_form_section_one">
                <Form.Item<FormParams>
                    className="ant-fom-item"
                    name='email'
                    rules={[{ required: true, message: 'Please input your e-mail!' }]}
                >
                    <Input
                        className="ant-fom-item-email"
                        addonBefore='e-mail:'
                        data-test-id='login-email'
                    />
                </Form.Item>
                <Form.Item<FormParams>
                    className="ant-fom-item"
                    name='password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        className="ant-fom-item-password"
                        placeholder='Пароль'
                        data-test-id='login-password'
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
            </div>

            <Form.Item className="login-form-cont">
                <div className="login-form-container">
                    <Form.Item name='remember' valuePropName='checked' noStyle={true}>
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>

                    <button
                        data-test-id='login-forgot-button'
                        className={`login-form-forgot ${isRepeatButtonDisabled ? 'disabled' : ''}`}
                        onClick={confirmEmail}
                    >
                        Забыли пороль?
                    </button>
                </div>
            </Form.Item>

            <Form.Item className="ant-fom-item-button">
                <Button
                    data-test-id='login-submit-button'
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item className="ant-fom-item-button-g">
                <Button
                    type='default'
                    className='google-login-button'
                    icon={<GooglePlusOutlined />}
                    onClick={onGoogleLogIn}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
