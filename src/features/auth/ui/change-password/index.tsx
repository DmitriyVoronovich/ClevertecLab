import { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import fon from '@image/login-page/image/fon.png';
import { Button, Form, Input } from 'antd';

import { PasswordParams } from '../../api/types/types.ts';
import { authThunks } from '../../model/auth-slice.ts';

import { onValidateConfirmPassword } from './utils/on-validate-confirm-password.ts';
import { onValidatePassword } from './utils/on-validate-password.ts';

import './change-password.css';

export const ChangePassword = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const validatePassword = onValidatePassword(setIsPasswordValid);

    const validateConfirmPassword = onValidateConfirmPassword(form);

    const onFormFinish = (values: PasswordParams) => {
        dispatch(authThunks.changePassword(values));
        sessionStorage.setItem('changePassword', JSON.stringify(values));
    };

    const onFieldsChange = (_changedFields: any, allFields: any) => {
        const passwordField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'password',
        );
        const confirmPasswordField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'confirmPassword',
        );

        if (passwordField) {
            form.setFields([
                {
                    name: 'password',
                    errors: validatePassword(passwordField.value) ? [] : [''],
                },
            ]);
        }
        if (confirmPasswordField) {
            form.setFields([
                {
                    name: 'confirmPassword',
                    errors: validateConfirmPassword(confirmPasswordField.value)
                        ? []
                        : ['Пароли не совпадают'],
                },
            ]);
        }
    };

    return (
        <div className="change_password_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="change_password_container1">
                <div className="change_password_wrapper">
                    <h5 className="change_password_title">Восстановление аккауанта</h5>
                    <Form
                        form={form}
                        name='normal_login'
                        className='change_password_form'
                        onFinish={onFormFinish}
                        onFieldsChange={onFieldsChange}
                    >
                        <div className="change_password_form_section">
                            <Form.Item
                                className="ant-fom-item"
                                name='password'
                                rules={[{ required: true }]}
                            >
                                <Input.Password
                                    className="ant-fom-item-password"
                                    placeholder='Пароль'
                                    data-test-id='change-password'
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            </Form.Item>
                            <span
                                className={`change_password_password_message ${
                                    !isPasswordValid ? 'error' : ''
                                }`}
                            >
                                Пароль не менее 8 символов, с заглавной буквой и цифрой
                            </span>
                            <Form.Item
                                className="ant-fom-item"
                                name='confirmPassword'
                                rules={[
                                    { required: true, message: 'Please repeat your Password!' },
                                ]}
                            >
                                <Input.Password
                                    data-test-id='change-confirm-password'
                                    className="ant-fom-item-password"
                                    placeholder='Повторите пароль'
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            </Form.Item>
                        </div>

                        <Form.Item className="change_password_button">
                            <Button
                                data-test-id='change-submit-button'
                                type='primary'
                                htmlType='submit'
                                className='change_password_form_button'
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
