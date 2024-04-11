import { useState } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { BadgeComponent } from '@components/index.ts';
import { useIsMobile } from '@utils/useIsMobile.ts';
import { Drawer } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';

import { formateDate } from '../drawer-modal/utils/formate-date.ts';
import { transformValueToTrain } from '../drawer-modal/utils/transform-value-to-train.ts';
import { WorkoutEditForm } from '../workout-edit-form';
import { ExerciseItem } from '../workout-edit-form/types/types.ts';

import { WorkoutEditModalProps } from './types/types.ts';

import '../drawer-modal/darwel-modal.css';

export const WorkoutEditModal = ({
    onAddTrainExercise,
    onEditDrawerModalClose,
    date,
    separateWorkout,
    selectedTrainingItem,
}: WorkoutEditModalProps) => {
    const [form, setForm] = useState<FormInstance>();
    const isMobile = useIsMobile();

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
            height={isMobile ? 555 : '100%'}
            onClose={onClose}
            open={true}
            mask={false}
            placement={isMobile ? 'bottom' : 'right'}
            maskClosable={false}
            className="drawer_container"
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            extra={<EditOutlined style={{ width: '14px', height: '14px' }} />}
        >
            <div className="info_section">
                {selectedTrainingItem ? (
                    <BadgeComponent
                        name={selectedTrainingItem?.name}
                        color={selectedTrainingItem?.color}
                        index={1}
                        fontSize="14px"
                        fontWeight="500"
                        colorText="#8C8C8C"
                    />
                ) : (
                    <></>
                )}
                <span className="info_date">{formateDate(date)}</span>
            </div>
            <WorkoutEditForm
                addItem={addItem}
                setFormSubmit={setForm}
                trainExercise={separateWorkout.exercises}
            />
        </Drawer>
    );
};
