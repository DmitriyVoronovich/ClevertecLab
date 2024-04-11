import {DATE_FORMAT} from '@data/constant.ts';
import {DatePicker, Form, Input} from 'antd';

import './personal-information.css'

export const PersonalInformation = () => {
    return (
        <div className="personal_container">
            <h4 className='profile_personal_title'>Личная информация</h4>
            <Form.Item className='profile_personal_form_item'
                       name='firstName'>
                <Input
                    data-test-id='profile-name'
                    placeholder='Имя'/>
            </Form.Item>
            <Form.Item className='profile_personal_form_item'
                       name='lastName'>
                <Input
                    data-test-id='profile-surname'
                    placeholder='Фамилия'/>
            </Form.Item>
            <Form.Item className='profile_personal_form_item'
                       name='birthday'>
                <DatePicker
                    data-test-id='profile-birthday'
                    placeholder='Дата рождения'
                    format={DATE_FORMAT}/>
            </Form.Item>
        </div>
    );
};
