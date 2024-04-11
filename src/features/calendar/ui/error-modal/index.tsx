import {CloseOutlined} from '@ant-design/icons';
import error from '@image/calendar-page/error_modal_svg.svg';
import {Button, Modal} from 'antd';

import './error-modal.css';

type ErrorModalProps = {
    callback: () => void
    back: () => void
}

export const ErrorModal = ({callback, back}: ErrorModalProps) => {

    const onCancelModal = () => {
        callback();
        back();
    };

    const onCancel = () => {
        back();
    };

    return (
        <Modal
            open={true}
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
