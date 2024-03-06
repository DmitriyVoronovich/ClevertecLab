import {useState} from "react";
import {HeaderSection} from "@components/header/HeaderSection.tsx";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {ReviewGroup,
    FeedbackForm,
    TokenRequestError,
    SuccessResult,
    ErrorResult,
    NoFeedbacks} from "../index.ts";
import s from './feedbacksPage.module.css';



export const FeedbacksPage = () => {
    const reviewList = useAppSelector(state => state.feedback.reviews);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCancelModalForm = () => {
        setIsModalOpen(false);
    };

    const showModalForm = () => {
        setIsModalOpen(true);
    };
    return (
        <div className={s.container}>
            <HeaderSection nameSection={'Отзывы пользователей'}/>
            {reviewList.length ? <ReviewGroup showModalForm={showModalForm}/> :
                <NoFeedbacks showModalForm={showModalForm}/>}
            <FeedbackForm isModalOpen={isModalOpen} onCancelModalForm={onCancelModalForm}/>
            <TokenRequestError/>
            <SuccessResult/>
            <ErrorResult showModalForm={showModalForm}/>
        </div>
    );
};
