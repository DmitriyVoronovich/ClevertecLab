import {useState} from "react";
import {HeaderSection} from "@components/header/HeaderSection.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {ReviewGroup,
    FeedbackForm,
    TokenRequestError,
    SuccessResult,
    ErrorResult,
    NoFeedbacks} from "../index.ts";
import s from './feedbacksPage.module.css';
import {setFeedbackStatus} from "../../model/feedbackSlice.ts";



export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const feedbackStatus = useAppSelector(state => state.feedback.feedbackStatus);
    const reviewList = useAppSelector(state => state.feedback.reviews);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCancelModalForm = () => {
        setIsModalOpen(false);
    };

    const showModalForm = () => {
        setIsModalOpen(true);
    };

    const changeStatus = () => {
        dispatch(setFeedbackStatus({feedbackStatus: 'idle'}));
    }

    return (
        <div className={s.container}>
            <HeaderSection nameSection={'Отзывы пользователей'}/>
            {reviewList.length ? <ReviewGroup showModalForm={showModalForm}/> :
                <NoFeedbacks showModalForm={showModalForm}/>}
            <FeedbackForm isModalOpen={isModalOpen} onCancelModalForm={onCancelModalForm}/>
            <TokenRequestError callback={changeStatus} status={feedbackStatus}/>
            <SuccessResult/>
            <ErrorResult showModalForm={showModalForm}/>
        </div>
    );
};
