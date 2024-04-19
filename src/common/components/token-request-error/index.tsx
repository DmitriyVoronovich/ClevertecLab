import { useEffect, useState } from 'react';
import {TokenRequestErrorProps} from '@components/token-request-error/types/types.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import error from '@image/login-page/svg-icon/error_check.svg';
import {pushWithFlow} from '@utils/push-with-flow.ts';
import { Button, Modal } from 'antd';

import './tokenRequestError.css';

export const TokenRequestError = ({ callback, status }: TokenRequestErrorProps) => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (status === 'failed') {
            setIsModalOpen(true);
        }
    }, [status]);

    const onCancelModalForm = () => {
        setIsModalOpen(false);
        callback();
        dispatch(pushWithFlow('/main'))
    };

    return (
        <Modal
            className="error_request_container"
            open={isModalOpen}
            closable={false}
            footer={null}
            data-test-id='modal-no-review'
        >
            <div className="error_request_wrapper">
                <img className="error_request_img" alt="error" src={error} />
                <h5 className="error_title">Что-то пошло не так</h5>
                <p className="error_request_description">Произошла ошибка, попробуйте ещё раз.</p>
                <Button
                    type='primary'
                    className="error_request_button"
                    onClick={onCancelModalForm}
                >
                    Назад
                </Button>
            </div>
        </Modal>
    );
};
