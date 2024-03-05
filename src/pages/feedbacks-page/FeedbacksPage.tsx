import s from './feedbacks-page.module.css'
import {Header} from "@pages/feedbacks-page/header/Header.tsx";
import {NoFeedbacks} from "@pages/feedbacks-page/no-feedbacks/NoFeedbacks.tsx";
import {ReviewGroup} from "@pages/feedbacks-page/review-group/ReviewGrop.tsx";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {FeedbackForm} from "@pages/feedbacks-page/feedback-form/FeedbackForm.tsx";
import {TokenRequestError} from "@pages/result/token-request-error/TokenRequestError.tsx";
import {SuccessResult} from "@pages/feedbacks-page/success-result/SuccessResult.tsx";
import {ErrorResult} from "@pages/error-result/ErrorResult.tsx";
import {useState} from "react";


export const FeedbacksPage = () => {
    const reviewList = useAppSelector(state => state.feedback.reviews);
    const feedbackStatus = useAppSelector(state => state.feedback.feedbackStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCancelModalForm = () => {
        setIsModalOpen(false);
    };

    const showModalForm = () => {
        setIsModalOpen(true);
    };
    return (
        <div className={s.container}>
            <Header nameSection={'Отзывы пользователей'}/>
            {reviewList.length ? <ReviewGroup showModalForm={showModalForm}/> :
                <NoFeedbacks showModalForm={showModalForm}/>}
            <FeedbackForm isModalOpen={isModalOpen} onCancelModalForm={onCancelModalForm}/>
            <TokenRequestError/>
            <SuccessResult/>
            <ErrorResult showModalForm={showModalForm}/>
        </div>
    );
};
