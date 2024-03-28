import {useEffect, useState} from 'react';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Form, Input} from 'antd';

import {PrivacyInformationProps} from './types/types.ts';

import './privacy-information.css'



export const PrivacyInformation = ({isPasswordValid, requiredField}: PrivacyInformationProps) => {
    const meInformation = useAppSelector(state => state.profile.meInformation);
    const [defaultEmail, setDefaultEmail] = useState(meInformation.email);

    useEffect(() => {
        setDefaultEmail(meInformation.email)
    }, [meInformation.email]);


    return (
        <div className="privacy_information_container">
            <h4 className='profile_privacy_title'>Приватность и авторизация</h4>
            <Form.Item className="ant-fom-item" name='email' rules={[{required: true}]}>
                <Input
                    data-test-id='profile-email'
                    defaultValue={defaultEmail}
                    className="ant-fom-item-email"
                    addonBefore='e-mail:'
                />
            </Form.Item>
            <Form.Item className="ant-fom-item" name='password' rules={[{required: requiredField}]}>
                <Input.Password
                    data-test-id='profile-password'
                    className="ant-fom-item-password"
                    placeholder='Пароль'
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                    }
                />
            </Form.Item>
            <span
                className={`registration_password_message ${!isPasswordValid ? 'error' : ''}`}
            >
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </span>
            <Form.Item
                className="ant-fom-item"
                name='repeatPassword'
                rules={[{required: requiredField, message: 'Please repeat your Password!'}]}
            >
                <Input.Password
                    data-test-id='profile-repeat-password'
                    className="ant-fom-item-password"
                    placeholder='Повторите пароль'
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                    }
                />
            </Form.Item>
        </div>
    );
};
