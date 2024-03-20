import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import success from '../../../../accets/login-page/svg-icon/success.svg';
import { feedbackThunks, setFeedbackStatus } from '../../model/feedbackSlice.ts';

import './successResult.css';
import { RequestFeedbackStatus } from '../../../../common/enums/enums.ts';

export const SuccessResult = () => {
    const dispatch = useAppDispatch();
    const feedbackStatus = useAppSelector((state) => state.feedback.feedbackStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (feedbackStatus === RequestFeedbackStatus.Succeeded) {
            return setIsModalOpen(true);
        }
    });

    const onClickHandler = () => {
        dispatch(feedbackThunks.getReviews());
        dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Idle }));
        setIsModalOpen(false);
    };

    return (
        <Modal
            className={'success_result_container'}
            open={isModalOpen}
            closable={false}
            centered
            okText={'Отлично'}
            footer={false}
        >
            <div className={'success_result_wrapper'}>
                <img className={'success_result_img'} alt={'success'} src={success} />
                <h5 className={'success_title'}>Отзыв успешно опубликован</h5>
                <Button type='primary' className={'success_result_button'} onClick={onClickHandler}>
                    Отлично
                </Button>
            </div>
        </Modal>
    );
};
