import {BLACKTHEMETOOLTIP, NOTIFICATIONSTOOLTIP, TRAINTOOLTIP} from '@data/constant.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Form} from 'antd';

import {profileThunks} from '../../../profile/model/profileSlice.ts';

import {SwitchComponent} from './switch';

import './switch-group.css';

export const SwitchGroup = () => {
    const dispatch = useAppDispatch();
    const meInformation = useAppSelector(state => state.profile.meInformation);

    const [form] = Form.useForm();

    const handleSwitchChange = (field: string, value: boolean) => {
        form.setFieldsValue({ [field]: value });
        const values = form.getFieldsValue();

        const user = {
            user: {
                email: meInformation.email,
                firstName: meInformation.firstName,
                lastName: meInformation.lastName,
                birthday: meInformation.birthday,
                imgSrc: meInformation.imgSrc,
                readyForJointTraining: values.jointTraining,
                sendNotification: values.notifications
            }
        }

        dispatch(profileThunks.editUserInformation(user))
    }

    return (
        <div className='switch_container'>
            <Form form={form} className='switch_group_form'
                  initialValues={{
                      jointTraining: meInformation.readyForJointTraining,
                      notifications: meInformation.sendNotification,
                      blackTheme: false
                  }}
            >
                <SwitchComponent title="Открыт для совместных тренировок"
                                 overlayStyle="205px"
                                 onChange={handleSwitchChange}
                                 dataTestIcon="tariff-trainings-icon"
                                 dataTestItem='tariff-trainings'
                                 formItemName='jointTraining'
                                 tooltip={TRAINTOOLTIP}
                                 className='switch_item_title'
                                 key={1}/>
                <SwitchComponent title="Уведомления"
                                 overlayStyle="205px"
                                 onChange={handleSwitchChange}
                                 dataTestIcon="tariff-notifications-icon"
                                 dataTestItem='tariff-notifications'
                                 formItemName='notifications'
                                 tooltip={NOTIFICATIONSTOOLTIP}
                                 className='switch_item_title'
                                 key={2}/>
                <SwitchComponent title="Темная тема"
                                 overlayStyle="113px"
                                 onChange={handleSwitchChange}
                                 dataTestIcon="tariff-theme-icon"
                                 dataTestItem='tariff-theme'
                                 formItemName='blackTheme'
                                 tooltip={BLACKTHEMETOOLTIP}
                                 className={meInformation.tariff ? 'switch_item_title' : 'switch_item_title_dis'}
                                 disabled={!meInformation.tariff}
                                 key={3}/>
            </Form>
        </div>
    );
};
