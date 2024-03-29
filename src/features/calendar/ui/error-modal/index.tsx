import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { RequestCalendarStatus } from '@enums/enums.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal } from 'antd';

import error from '@image/calendar-page/error_modal_svg.svg';
import { calendarThunks, setTrainingStatus } from '../../model/calendar-slice.ts';

import './error-modal.css';

export const ErrorModal = () => {
    const dispatch = useAppDispatch();
    const trainingStatus = useAppSelector((state) => state.calendar.trainingStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (trainingStatus === RequestCalendarStatus.Error) {
            setIsModalOpen(true);
        }
    }, [trainingStatus]);

    const onCancelModal = () => {
        setIsModalOpen(false);
        dispatch(
            calendarThunks.trainingList(() => {
                console.log();
            }),
        );
        dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Idle }));
    };

    const onCancel = () => {
        setIsModalOpen(false);
        dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Idle }));
    };

    return (
        <Modal
            open={isModalOpen}
            footer={null}
            className="calendar_error_modal_container"
            onCancel={onCancel}
            centered={true}
            style={{ width: '384px' }}
            closeIcon={<CloseOutlined data-test-id='modal-error-user-training-button-close' />}
        >
            <img src={error} alt="error" className="calendar_error_img" />
            <div className="calendar_error_wrapper_text">
                <h4
                    className="calendar_error_text_title"
                    data-test-id='modal-error-user-training-title'
                >
                    При открытии данных произошла ошибка.
                </h4>
                <p
                    className="calendar_error_text"
                    data-test-id='modal-error-user-training-subtitle'
                >
                    Попробуйте ещё раз.
                </p>
            </div>
            <Button
                className="calendar_error_button"
                onClick={onCancelModal}
                data-test-id='modal-error-user-training-button'
            >
                Обновить
            </Button>
        </Modal>
    );
};
