import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useState} from "react";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import fon from "../../../../accets/login-page/image/fon.png";
import './change-password.css'
import {authThunks} from "../../../../features/auth/auth.reducer.ts";
import {PasswordParamsType} from "../../../../features/auth/auth.api.ts";


export const ChangePassword = () => {
    const [form] = Form.useForm();
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const dispatch = useAppDispatch();

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const isValid = re.test(password);
        setIsPasswordValid(isValid);
        return isValid;
    };

    const validateConfirmPassword = (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (form.getFieldValue('password') !== password) {
            return false;
        } else {
            return re.test(password);
        }
    };

    const onFormFinish = (values: PasswordParamsType) => {
        dispatch(authThunks.changePassword(values));
        sessionStorage.setItem('changePassword', JSON.stringify(values));
    }

    const onFieldsChange = (_: any, allFields: any) => {
        const passwordField = allFields.find((field: {
            name: string[];
        }) => field.name[0] === 'password');
        const confirmPasswordField = allFields.find((field: {
            name: string[];
        }) => field.name[0] === 'confirmPassword');
        if (passwordField) {
            form.setFields([{
                name: 'password',
                errors: validatePassword(passwordField.value) ? [] : [''],
            }]);
        }
        if (confirmPasswordField) {
            form.setFields([{
                name: 'confirmPassword',
                errors: validateConfirmPassword(confirmPasswordField.value) ? [] : ['Пароли не совпадают'],
            }]);
        }
    };

    return (
        <div className={'change_password_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'change_password_container1'}>
                <div className={'change_password_wrapper'}>
                    <h5 className={'change_password_title'}>Восстановление аккауанта</h5>
                    <Form
                        form={form}
                        name="normal_login"
                        className="change_password_form"
                        onFinish={onFormFinish}
                        onFieldsChange={onFieldsChange}
                    >
                        <div className={'change_password_form_section'}>
                            <Form.Item
                                className={'ant-fom-item'}
                                name="password"
                                rules={[{required: true}]}
                            >
                                <Input.Password
                                    className={'ant-fom-item-password'}
                                    placeholder="Пароль"
                                    data-test-id='change-password'
                                    iconRender={visible => (visible ? <EyeTwoTone/> :
                                        <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>
                            <span
                                className={`change_password_password_message ${!isPasswordValid ? 'error' : ''}`}>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </span>
                            <Form.Item
                                className={'ant-fom-item'}
                                name="confirmPassword"
                                rules={[{required: true, message: 'Please repeat your Password!'}]}
                            >
                                <Input.Password
                                    data-test-id='change-confirm-password'
                                    className={'ant-fom-item-password'}
                                    placeholder="Повторите пароль"
                                    iconRender={visible => (visible ? <EyeTwoTone/> :
                                        <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item className={'change_password_button'}>
                            <Button
                                data-test-id='change-submit-button'
                                type="primary"
                                htmlType="submit"
                                className="change_password_form_button">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
