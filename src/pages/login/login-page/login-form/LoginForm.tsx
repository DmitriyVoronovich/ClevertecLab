import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './login-form.css';
import {authThunks} from "../../../../features/auth/auth.reducer.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {useState} from "react";

export type FormType = {
    email: string
    password: string
    remember: boolean
}

export const LoginForm = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isRepeatButtonDisabled, setIsRepeatButtonDisabled] = useState(true);
    const [isEmailLogin, setIsEmailLogin] = useState('');

    const onFinish = (values: FormType) => {
        dispatch(authThunks.login(values));
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        if (re.test(email)) {
            setIsRepeatButtonDisabled(false)
        }
        return re.test(email);
    };

    const confirmEmail = () => {
        sessionStorage.setItem('email', JSON.stringify(isEmailLogin));
        dispatch(authThunks.checkEmail(isEmailLogin));
    };

    const onFieldsChange = (_: any, allFields: any) => {
        const emailField = allFields.find((field: { name: string[]; }) => field.name[0] === 'email');

        if (emailField) {
            setIsEmailLogin(emailField.value)
            setIsRepeatButtonDisabled(true)
            form.setFields([{
                name: 'email',
                errors: validateEmail(emailField.value) ? [] : [''],
            }]);
        }
    };

    return (
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
        >
            <div className={'login_form_section_one'}>
                <Form.Item<FormType>
                    className={'ant-fom-item'}
                    name="email"
                    rules={[{ required: true, message: 'Please input your e-mail!' }]}
                >
                    <Input className={'ant-fom-item-email'} addonBefore="e-mail:" onChange={console.log}/>
                </Form.Item>
                <Form.Item<FormType>
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
            </div>

            <Form.Item className={'login-form-cont'}>
                <div className={'login-form-container'}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <button className={`login-form-forgot ${isRepeatButtonDisabled ? 'disabled' : ''}`}
                            disabled={isRepeatButtonDisabled}
                            onClick={confirmEmail}>
                        Забыли пороль?
                    </button>
                </div>
            </Form.Item>

            <Form.Item className={'ant-fom-item-button'}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
            </Form.Item>
            <Form.Item className={'ant-fom-item-button-g'}>
                <Button
                    type="default"
                    className="google-login-button"
                    icon={<GooglePlusOutlined />}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
