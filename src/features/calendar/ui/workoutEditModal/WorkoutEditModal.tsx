import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { useState } from 'react';
import { BadgeComponent } from '../../../../common/components';
import { isMobile } from '../../../../common/utils/isMobile.ts';
import { formateDate } from '../drawerModal/utils/formateDate.ts';
import { transformValueToTrain } from '../drawerModal/utils/transformValueToTrain.ts';
import { ExerciseItem } from '../workoutEditForm/types/types.ts';
import { WorkoutEditForm } from '../workoutEditForm/WorkoutEditForm.tsx';
import { WorkoutEditModalProps } from './types/types.ts';
import '../drawerModal/darwelModal.css';

export const WorkoutEditModal = ({
    onAddTrainExercise,
    onEditDrawerModalClose,
    date,
    separateWorkout,
    selectedTrainingItem,
}: WorkoutEditModalProps) => {
    const [form, setForm] = useState<FormInstance>();

    const addItem = (value: ExerciseItem[]) => {
        const transformTrainValues = transformValueToTrain(value);
        onAddTrainExercise(transformTrainValues);
    };

    const onClose = () => {
        onEditDrawerModalClose();
        form?.submit();
        setTimeout(() => form?.resetFields(), 1000);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title='Редактирование'
            width={408}
            height={isMobile() ? 555 : '100%'}
            onClose={onClose}
            open={true}
            mask={false}
            placement={isMobile() ? 'bottom' : 'right'}
            maskClosable={false}
            className={'drawer_container'}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            extra={<EditOutlined style={{ width: '14px', height: '14px' }} />}
        >
            <div className={'info_section'}>
                {selectedTrainingItem ? (
                    <BadgeComponent
                        name={selectedTrainingItem?.name}
                        color={selectedTrainingItem?.color}
                        index={1}
                        fontSize={'14px'}
                        fontWeight={'500'}
                        colorText={'#8C8C8C'}
                    />
                ) : (
                    <></>
                )}
                <span className={'info_date'}>{formateDate(date)}</span>
            </div>
            <WorkoutEditForm
                addItem={addItem}
                setFormSubmit={setForm}
                trainExercise={separateWorkout.exercises}
            />
        </Drawer>
    );
};
