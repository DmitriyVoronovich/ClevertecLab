import { AddTrainingStatus } from '@enums/enums.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import error from '@image/calendar-page/add_error.svg';
import { Button, Modal } from 'antd';

import { setAddTrainingStatus } from '../../model/calendar-slice.ts';

import { AddErrorModalProps } from './types/types.ts';

import './add-error-modal.css';

export const AddErrorModal = ({ onClose }: AddErrorModalProps) => {
    const dispatch = useAppDispatch();

    const onCancelModal = () => {
        dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Idle }));
        onClose();
    };

    return (
        <Modal
            open={true}
            footer={null}
            className="add_error_modal_container"
            onCancel={onCancelModal}
            centered={true}
            style={{ width: '416px' }}
            closable={false}
            maskClosable={false}
        >
            <div className="add_error_content_wrapper">
                <img src={error} alt="error" className="add_error_img" />
                <div className="add_error_wrapper_text">
                    <h4
                        className="add_error_text_title"
                        data-test-id='modal-error-user-training-title'
                    >
                        При сохранении данных произошла ошибка
                    </h4>
                    <p
                        className="add_error_text"
                        data-test-id='modal-error-user-training-subtitle'
                    >
                        Придётся попробовать ещё раз
                    </p>
                </div>
            </div>
            <Button
                className="add_error_button"
                onClick={onCancelModal}
                data-test-id='modal-error-user-training-button'
            >
                Закрыть
            </Button>
        </Modal>
    );
};
