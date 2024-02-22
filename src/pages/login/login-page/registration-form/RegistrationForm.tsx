import './registration-form.css'
import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@redux/configure-store.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {authThunks} from "../../../../features/auth/auth.reducer.ts";
import {LoginParamsType} from "../../../../features/auth/auth.api.ts";

export const RegistrationForm = () => {
    const [form] = Form.useForm();
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const navigate = useNavigate();
    const isRegistered = useSelector((state: RootState) => state.auth.isRegistered);
    const dispatch = useAppDispatch();

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const isValid = re.test(password);
        setIsPasswordValid(isValid);
        return isValid;
    };

    const validateRepeatPassword = (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (form.getFieldValue('password') !== password) {
            return false;
        } else {
            return re.test(password);
        }
    };

    const onFinish = (values: LoginParamsType) => {
        console.log('Received values of form: ', values);
        const data = {email: values.email, password: values.password};
        dispatch(authThunks.registration(data))
    };

    const onFieldsChange = (_: any, allFields: any) => {
        const emailField = allFields.find((field: { name: string[]; }) => field.name[0] === 'email');
        const passwordField = allFields.find((field: { name: string[]; }) => field.name[0] === 'password');
        const repeatPasswordField = allFields.find((field: { name: string[]; }) => field.name[0] === 'repeatPassword');
        if (emailField) {
            form.setFields([{
                name: 'email',
                errors: validateEmail(emailField.value) ? [] : [''],
            }]);
        }
        if (passwordField) {
            form.setFields([{
                name: 'password',
                errors: validatePassword(passwordField.value) ? [] : [''],
            }]);
        }
        if (repeatPasswordField) {
            form.setFields([{
                name: 'repeatPassword',
                errors: validateRepeatPassword(repeatPasswordField.value) ? [] : ['Пароли не совпадают'],
            }]);
        }
    };

    if (isRegistered) {
        return navigate('/auth');
    }

    return (
        <Form
            form={form}
            name="normal_login"
            className="registration-form"
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
        >
            <div className={'registration_form_section'}>
                <Form.Item
                    className={'ant-fom-item'}
                    name="email"
                    rules={[{ required: true }]}
                >
                    <Input className={'ant-fom-item-email'} addonBefore="e-mail:" />
                </Form.Item>
                <Form.Item
                    className={'ant-fom-item'}
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password
                        className={'ant-fom-item-password'}
                        placeholder="Пароль"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <span className={`registration_password_message ${!isPasswordValid ? 'error' : ''}`}>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </span>
                <Form.Item
                className={'ant-fom-item'}
                name="repeatPassword"
                rules={[{required: true, message: 'Please repeat your Password!'}]}
            >
                <Input.Password
                    className={'ant-fom-item-password'}
                    placeholder="Повторите пароль"
                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                />
            </Form.Item>
            </div>

            <Form.Item className={'form-item-button'}>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="registration-form-button">
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
