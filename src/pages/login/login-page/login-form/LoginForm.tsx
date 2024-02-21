import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './login-form.css';
import {authApi} from "../../../../api/auth.api.ts";

type FormType = {
    email: string,
    password: string
}

export const LoginForm = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: FormType) => {
        console.log('Received values of form: ', values);
        console.log(values.email)
        console.log(values.password)
        const res = await authApi.login({email: values.email, password: values.password})
        console.log(res)
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const onFieldsChange = (_: any, allFields: any) => {
        const emailField = allFields.find((field: { name: string[]; }) => field.name[0] === 'email');
        if (emailField) {
            form.setFields([{
                name: 'email',
                errors: validateEmail(emailField.value) ? [] : ['Please input a valid e-mail!'],
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
                    <Input className={'ant-fom-item-email'} addonBefore="e-mail:" />
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Забыли пороль?
                </a>
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
