import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal } from 'antd';

import error from '@image/login-page/svg-icon/error.svg';
import { RequestFeedbackStatus } from '@enums/enums.ts';
import { setFeedbackStatus } from '../../model/feedback-slice.ts';

import { ErrorResultProps } from './types/types.ts';

import './error-result.css';

export const ErrorResult = ({ showModalForm }: ErrorResultProps) => {
    const dispatch = useAppDispatch();
    const feedbackStatus = useAppSelector((state) => state.feedback.feedbackStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (feedbackStatus === RequestFeedbackStatus.Error) {
            return setIsModalOpen(true);
        }
    });

    const onModalClose = () => {
        dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Error }));
        showModalForm();
        setIsModalOpen(false);
    };

    const onErrorModalClose = () => {
        dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Idle }));
        setIsModalOpen(false);
    };

    return (
        <Modal
            className="error_result_container"
            open={isModalOpen}
            closable={false}
            centered={true}
            footer={null}
        >
            <div className="error_result_wrapper">
                <img className="error_result_img" alt="error" src={error} />
                <h5 className="error_title">Данные не сохранились</h5>
                <p className="error_result_description">
                    Что-то пошло не так.Попробуйте ещё раз.
                </p>
                <div className="error_result_button_cont">
                    <Button
                        type='primary'
                        className="error_result_button"
                        data-test-id='write-review-not-saved-modal'
                        onClick={onModalClose}
                    >
                        Написать отзыв
                    </Button>
                    <Button className="error_result_button_def" onClick={onErrorModalClose}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
