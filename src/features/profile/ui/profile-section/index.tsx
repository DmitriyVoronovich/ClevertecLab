import {useEffect, useState} from 'react';
import {RequestProfileStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Button, Form, notification} from 'antd';
import {NotificationPlacement} from 'antd/es/notification/interface';

import {VALIDATE_EMAIL, VALIDATE_PASSWORD} from '../../../../data/constant.ts';
import {LoginParams} from '../../../auth/api/types/types.ts';
import {profileThunks, setProfileStatus} from '../../model/profileSlice.ts';
import {Avatar} from '../avatar';
import {FileSizeError} from '../file-size-error';
import {PersonalInformation} from '../personal-information';
import {PrivacyInformation} from '../privacy-information';
import {ProfileRequestError} from '../profile-request-error';
import {SuccessNotification} from '../success-notification';

import './profile-section.css';

export const ProfileSection = () => {
    const dispatch = useAppDispatch();
    const meInformation = useAppSelector(state => state.profile.meInformation);
    const avatarUrl = useAppSelector(state => state.profile.avatarUrl);
    const profileStatus = useAppSelector(state => state.profile.profileStatus);
    const [saveBattonDisabled, setSaveBattonDisabled] = useState(true);
    const [openErrorSizeModal, setOpenErrorSizeModal] = useState( false);
    const [requiredField, setRequiredField] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [form] = Form.useForm();

    const openNotification = (placement: NotificationPlacement) => {
        api.open({
            message: <SuccessNotification/>,
            className: 'notification',
            duration: 4,
            closeIcon: false,
            placement
        });
    };

    const onModalOpen = () => {
        setOpenErrorSizeModal(true)
        setSaveBattonDisabled(true)
    };

    useEffect(() => {
        if (profileStatus === RequestProfileStatus.Selected) {
            openNotification('bottom');
            form.setFieldsValue({
                password: undefined,
                repeatPassword: undefined,
            });
        }
        if (profileStatus === RequestProfileStatus.Failed) {
            onModalOpen()
        }
        window.scrollTo(0, 0)
    }, [profileStatus])

    const validateEmail = (email: string) => {

        if (VALIDATE_EMAIL.test(email)) {
            setSaveBattonDisabled(false)
        }

        return VALIDATE_EMAIL.test(email);
    };

    const validatePassword = (password: string) => {
        const isValid = VALIDATE_PASSWORD.test(password);

        if (password === undefined) {
            setIsPasswordValid(true);
            setRequiredField(false)

            return true
        }
            setIsPasswordValid(isValid);
            setRequiredField(true)

            return isValid;
    };

    const validateRepeatPassword = (password: string) => {

        if (form.getFieldValue('password') === undefined) {

            return true
        }
            if (form.getFieldValue('password') !== password) {

                return false;
            }
            setSaveBattonDisabled(false)

            return VALIDATE_PASSWORD.test(password);
    };

    const onFieldsChange = (_: any, allFields: any) => {

        const emailField = allFields.find((field: { name: string[] }) => field.name[0] === 'email');
        const passwordField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'password',
        );
        const repeatPasswordField = allFields.find(
            (field: { name: string[] }) => field.name[0] === 'repeatPassword',
        );

        if (emailField) {
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
                    errors: validatePassword(passwordField.value)  ? [] : [''],
                },
            ]);

        }
        if (repeatPasswordField) {
            form.setFields([
                {
                    name: 'repeatPassword',
                    errors: validateRepeatPassword(repeatPasswordField.value)
                        ? []
                        : ['Пароли не совпадают'],
                },
            ]);

        }
    };

    const onFinish = (values: LoginParams) => {
        let dateStr
        if (values.birthday) {
           dateStr = values.birthday.format('YYYY-MM-DDTHH:mm:ss');
        }

        const user = {
            user: {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                birthday: dateStr,
                imgSrc: avatarUrl,
                readyForJointTraining: meInformation.readyForJointTraining,
                sendNotification: meInformation.sendNotification
            }
        }
        console.log(user)
        setSaveBattonDisabled(true)
        dispatch(profileThunks.editUserInformation({user: user}));
    };

    const onModalClose = () => {
        setOpenErrorSizeModal(false)
        setSaveBattonDisabled(true)
        dispatch(setProfileStatus({profileStatus: RequestProfileStatus.Idle}))
    };

    const onButtonDisablet = () => setSaveBattonDisabled(true);

    return (
        <>
            {contextHolder}
            <div className="profile_section_container">
                <div className="profile_section_content">
                    <Form onFieldsChange={onFieldsChange} onFinish={onFinish} form={form}
                          initialValues={{
                              email: meInformation.email,
                              firstName: meInformation.firstName,
                              lastName: meInformation.lastName,
                    }}>
                        <div className="profile_personal_information">
                            <Avatar onModalOpen={onModalOpen} onButtonDisablet={onButtonDisablet}/>
                            <PersonalInformation/>
                        </div>
                        <div className='profile_privacy_information'>
                            <PrivacyInformation isPasswordValid={isPasswordValid}
                                                requiredField={requiredField}/>
                        </div>
                        <Form.Item className="profile_form_item_button">
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='profile-form-button'
                                disabled={saveBattonDisabled}
                                data-test-id='profile-submit'
                            >
                                Сохранить изменения
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {profileStatus === RequestProfileStatus.Error && <ProfileRequestError/>}
            {openErrorSizeModal && <FileSizeError onClose={onModalClose}/>}
        </>
    )
};
