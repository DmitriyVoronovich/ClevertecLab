import { useEffect, useState } from 'react';
import { RequestFeedbackStatus } from '@enums/enums.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import success from '@image/login-page/svg-icon/success.svg';
import { Button, Modal } from 'antd';

import { feedbackThunks, setFeedbackStatus } from '../../model/feedback-slice.ts';

import './success-result.css';

export const SuccessResult = () => {
    const dispatch = useAppDispatch();
    const feedbackStatus = useAppSelector((state) => state.feedback.feedbackStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (feedbackStatus === RequestFeedbackStatus.Succeeded) {
            setIsModalOpen(true);
        }
    }, [feedbackStatus]);

    const onClickHandler = () => {
        dispatch(feedbackThunks.getReviews());
        dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Idle }));
        setIsModalOpen(false);
    };

    return (
        <Modal
            className="success_result_container"
            open={isModalOpen}
            closable={false}
            centered={true}
            okText="Отлично"
            footer={false}
        >
            <div className="success_result_wrapper">
                <img className="success_result_img" alt="success" src={success} />
                <h5 className="success_title">Отзыв успешно опубликован</h5>
                <Button type='primary' className="success_result_button" onClick={onClickHandler}>
                    Отлично
                </Button>
            </div>
        </Modal>
    );
};
