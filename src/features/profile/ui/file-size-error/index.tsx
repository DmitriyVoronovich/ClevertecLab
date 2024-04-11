import error from '@image/calendar-page/add_error.svg';
import {Button, Modal} from 'antd';

import {FileSizeErrorProps} from './types/types.ts';

import './file-size-error.css';

export const FileSizeError = ({onClose}: FileSizeErrorProps) => {

    return (
        <Modal
            open={true}
            footer={null}
            className="file_size_error_modal_container"
            onCancel={onClose}
            centered={true}
            style={{width: '416px'}}
            closable={false}
            maskClosable={false}
        >
            <div className="file_size_error_content_wrapper">
                <img src={error} alt="error" className="add_error_img"/>
                <div className="file_size_error_wrapper_text">
                    <h4
                        className="file_size_error_text_title"
                    >
                        Файл слишком большой
                    </h4>
                    <p
                        className="file_size_error_text"
                    >
                        Выберите файл менее 5МБ.
                    </p>
                </div>
            </div>
            <Button
                data-test-id='big-file-error-close'
                className="file_size_error_button"
                onClick={onClose}
            >
                Закрыть
            </Button>
        </Modal>
    );
};
