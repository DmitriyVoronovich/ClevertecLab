import {ExclamationCircleOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Form, Switch, Tooltip} from 'antd';

import {BLACKTHEMETOOLTIP, NOTIFICATIONSTOOLTIP, TRAINTOOLTIP} from '../../../../data/constant.ts';
import {profileThunks} from '../../../profile/model/profileSlice.ts';

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
                <div className='switch_item'>
                    <div className='switch_item_title'>
                        <span>Открыт для совместных тренировок</span>
                        <Tooltip placement="bottomLeft" title={TRAINTOOLTIP}
                                 overlayStyle={{width: '205px'}}>
                            <ExclamationCircleOutlined  data-test-id='tariff-trainings-icon' style={{
                                fontSize: '16px',
                                marginLeft: '4px',
                                color: '#8C8C8C'
                            }}/>
                        </Tooltip>
                    </div>
                    <Form.Item name='jointTraining'>
                        <Switch data-test-id='tariff-trainings' onChange={(value) => handleSwitchChange('jointTraining', value)}/>
                    </Form.Item>
                </div>
                <div className='switch_item'>
                    <div className='switch_item_title'>
                        <span>Уведомления</span>
                        <Tooltip placement="bottomLeft" title={NOTIFICATIONSTOOLTIP}
                                 overlayStyle={{width: '205px'}}
                                >
                            <ExclamationCircleOutlined  data-test-id='tariff-notifications-icon' style={{
                                fontSize: '16px',
                                marginLeft: '4px',
                                color: '#8C8C8C'
                            }}/>
                        </Tooltip>
                    </div>
                    <Form.Item name="notifications">
                        <Switch data-test-id='tariff-notifications' onChange={(value) => handleSwitchChange('notifications', value)}/>
                    </Form.Item>
                </div>
                <div className='switch_item'>
                    <div className={meInformation.tariff ? 'switch_item_title' : 'switch_item_title_dis'}>
                        <span>Темная тема</span>
                        <Tooltip placement="bottomLeft"
                                 title={BLACKTHEMETOOLTIP}
                                 overlayStyle={{width: '113px'}}>
                            <ExclamationCircleOutlined data-test-id='tariff-theme-icon' style={{
                                fontSize: '16px',
                                marginLeft: '4px',
                                color: '#8C8C8C'
                            }}/>
                        </Tooltip>
                    </div>
                    <Form.Item name="blackTheme">
                        <Switch disabled={!meInformation.tariff}
                                data-test-id='tariff-theme'
                                onChange={(value) => handleSwitchChange('blackTheme', value)}/>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
