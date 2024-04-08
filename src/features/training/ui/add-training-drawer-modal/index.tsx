import {useState} from 'react';
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/useIsMobile.ts';
import {Button, Drawer} from 'antd';
import {FormInstance} from 'antd/es/form/hooks/useForm';

import {trainingThunks} from '../../model/training-slice.ts';
import {AddTrainingDrawerForm} from '../add-training-drawer-form';

import {AddTrainingDrawerModalProps} from './types/types.ts';

import './add-training-drawer-modal.css';
import {InvitationToJointTraining} from "@enums/enums.ts";

export const AddTrainingDrawerModal = ({onClose, user}: AddTrainingDrawerModalProps) => {
    const dispatch = useAppDispatch();
    const trainList = useAppSelector((state) => state.calendar.trainingList);
    const invitationMode = useAppSelector((state) => state.training.invitationMode);
    const [form, setForm] = useState<FormInstance>();
    const [disabledSaveButton, setDisabledSaveButton] = useState(true);
    const isMobile = useIsMobile();

    const invitationModeOn = invitationMode === InvitationToJointTraining.Invitation

    const onSaveTraining = () => {
        onClose();
        form?.submit();
        setTimeout(() => form?.resetFields(), 1000);
    };

    const onCloseDrawer = () => onClose();

    const onUnDisabledSaveButton = () => setDisabledSaveButton(false);

    const onDisabledSaveButton = () => setDisabledSaveButton(true);

    const onFinish = (values: any, periodicityOpen: boolean) => {
        const trainName = trainList.find((item) => item.key === values.selector)
        const name = invitationModeOn ? user?.trainingType : trainName?.name
        const train = {
            name,
            date: values.date,
            isImplementation: false,
            parameters: {
                repeat: periodicityOpen,
                period: values.period || null,
                jointTraining: false,
                participants: [],
            },
            exercises: values.exercise.map((item: any) => ({
                name: item.name,
                replays: item.replays || 1,
                weight: item.weight || 0,
                approaches: item.approaches || 1,
            })),
        }

        dispatch(trainingThunks.addTraining(train))
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title={invitationModeOn ? 'Совместная тренировка' : 'Добавление упражнений'}
            placement={isMobile ? 'bottom' : 'right'}
            height={isMobile ? 555 : '100%'}
            width={408}
            open={true}
            footer={
                <Button className='drawer_footer_button'
                        onClick={onSaveTraining}
                        disabled={disabledSaveButton}>
                    {invitationModeOn ? 'Отправить приглашение' : 'Сохранить'}
                </Button>
            }
            onClose={onCloseDrawer}
            mask={false}
            maskClosable={false}
            className="training_drawer_container"
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close'/>}
            extra={<PlusOutlined style={{width: '14px', height: '14px'}}/>}
        >
            <AddTrainingDrawerForm setFormSubmit={setForm}
                                   onFinish={onFinish}
                                   user={user}
                                   onUnDisabledSaveButton={onUnDisabledSaveButton}
                                   onDisabledSaveButton={onDisabledSaveButton}/>
        </Drawer>
    );
};
