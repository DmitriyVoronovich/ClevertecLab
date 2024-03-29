import { useState } from 'react';
import { HeaderSection } from '@components/header';
import { RequestFeedbackStatus } from '@enums/enums.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';

import { setFeedbackStatus } from '../../model/feedback-slice.ts';
import {
    ErrorResult,
    FeedbackForm,
    NoFeedbacks,
    ReviewGroup,
    SuccessResult,
    TokenRequestError,
} from '..';

import s from './feedbacks-page.module.css';

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
            <HeaderSection nameSection="Отзывы пользователей" />
            {reviewList.length ? (
                <ReviewGroup showModalForm={showModalForm} />
            ) : (
                <NoFeedbacks showModalForm={showModalForm} />
            )}
            {isModalOpen && <FeedbackForm onCancelModalForm={onCancelModalForm}/>}
            <TokenRequestError callback={changeStatus} status={feedbackStatus} />
            <SuccessResult />
            <ErrorResult showModalForm={showModalForm} />
        </div>
    );
};
