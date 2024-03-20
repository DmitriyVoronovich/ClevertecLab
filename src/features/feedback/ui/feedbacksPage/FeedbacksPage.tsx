import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useState } from 'react';
import { HeaderSection } from '../../../../common/components';
import { RequestFeedbackStatus } from '../../../../common/enums/enums.ts';
import { setFeedbackStatus } from '../../model/feedbackSlice.ts';
import {
    ErrorResult,
    FeedbackForm,
    NoFeedbacks,
    ReviewGroup,
    SuccessResult,
    TokenRequestError,
} from '../index.ts';
import s from './feedbacksPage.module.css';

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const feedbackStatus = useAppSelector((state) => state.feedback.feedbackStatus);
    const reviewList = useAppSelector((state) => state.feedback.reviews);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCancelModalForm = () => setIsModalOpen(false);

    const showModalForm = () => setIsModalOpen(true);

    const changeStatus = () =>
        dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Idle }));

    return (
        <div className={s.container}>
            <HeaderSection nameSection={'Отзывы пользователей'} />
            {reviewList.length ? (
                <ReviewGroup showModalForm={showModalForm} />
            ) : (
                <NoFeedbacks showModalForm={showModalForm} />
            )}
            <FeedbackForm isModalOpen={isModalOpen} onCancelModalForm={onCancelModalForm} />
            <TokenRequestError callback={changeStatus} status={feedbackStatus} />
            <SuccessResult />
            <ErrorResult showModalForm={showModalForm} />
        </div>
    );
};
