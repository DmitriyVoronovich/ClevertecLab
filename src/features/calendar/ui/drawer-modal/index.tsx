import { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { BadgeComponent } from '@components/badge-component';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useIsMobile } from '@utils/use-is-mobile.ts';
import { Drawer } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';

import { DrawerForm } from '../drawer-form';
import { ExerciseItem } from '../workout-edit-form/types/types.ts';

import { DrawerModalProps } from './types/types.ts';
import { formateDate } from './utils/formate-date.ts';
import { transformValueToTrain } from './utils/transform-value-to-train.ts';

import './darwel-modal.css';

export const DrawerModal = ({
    onAddTrainExercise,
    onDrawerModalClose,
    date,
    selectTrain,
    trainExercise,
}: DrawerModalProps) => {
    const trainingList = useAppSelector((state) => state.calendar.trainingList);
    const [form, setForm] = useState<FormInstance>();
    const isMobile = useIsMobile();

    const train = trainingList.find((item) => item.key === selectTrain);

    const addItem = (value: ExerciseItem[]) => {
        const transformTrainValues = transformValueToTrain(value);

        onAddTrainExercise(transformTrainValues);
    };

    const onClose = () => {
        onDrawerModalClose();
        form?.submit();
        setTimeout(() => form?.resetFields(), 1000);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title='Добавление упражнений'
            placement={isMobile ? 'bottom' : 'right'}
            height={isMobile ? 555 : '100%'}
            width={408}
            open={true}
            onClose={onClose}
            mask={false}
            maskClosable={false}
            className="drawer_container"
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            extra={<PlusOutlined style={{ width: '14px', height: '14px' }} />}
        >
            <div className="info_section">
                {train ? (
                    <BadgeComponent
                        name={train?.name}
                        color={train?.color}
                        index={1}
                        fontSize="14px"
                        fontWeight="500"
                    />
                ) : (
                    <></>
                )}
                <span className="info_date">{formateDate(date)}</span>
            </div>
            <DrawerForm addItem={addItem} setFormSubmit={setForm} trainExercise={trainExercise} />
        </Drawer>
    );
};
