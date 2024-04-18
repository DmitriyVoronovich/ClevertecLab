import {useState} from 'react';
import {CloseOutlined, EditOutlined} from '@ant-design/icons';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {useIsMobile} from '@utils/use-is-mobile.ts';
import {Button, Drawer} from 'antd';
import {FormInstance} from 'antd/es/form/hooks/useForm';

import {trainingThunks} from '../../model/training-slice.ts';
import {EditTrainingForm} from '../edit-training-form';

import {EditTrainingModal} from './types/types.ts';


export const EditTrainingDrawer = ({onClose, separateWorkout}: EditTrainingModal) => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<FormInstance>();
    const [disabledEditButton, setDisabledEditButton] = useState(false);
    const isMobile = useIsMobile();

    const onSaveTraining = () => {
        onClose();
        form?.submit();
        setTimeout(() => form?.resetFields(), 1000);
    };

    const onCloseDrawer = () => onClose();

    const onUnDisabledEditButton = () => setDisabledEditButton(false);

    const onFinish = (values: any) => {

        const train = {
            name: separateWorkout?.name,
            date: values.date,
            isImplementation: false,
            parameters: {
                repeat: !!values.period,
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

        dispatch(
            trainingThunks.editTraining({
                training: train,
                trainingId: separateWorkout._id || '',
            }))
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title='Редактирование'
            placement={isMobile ? 'bottom' : 'right'}
            height={isMobile ? 555 : '100%'}
            width={408}
            open={true}
            footer={
                <Button className='drawer_footer_button' onClick={onSaveTraining}
                        disabled={disabledEditButton}>Сохранить</Button>
            }
            onClose={onCloseDrawer}
            mask={false}
            maskClosable={false}
            className="training_drawer_container"
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close'/>}
            extra={<EditOutlined style={{width: '14px', height: '14px'}}/>}
        >
            <EditTrainingForm setFormSubmit={setForm}
                              onFinish={onFinish}
                              onUnDisabledEditButton={onUnDisabledEditButton}
                              separateWorkout={separateWorkout}/>
        </Drawer>
    );
};
