import s from './review-group.module.css';
import {Review} from "@pages/feedbacks-page/review/Review.tsx";
import {Button} from "antd";
import { useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {useEffect, useState} from "react";

type ReviewGropProps = {
    showModalForm: () => void
}

export const ReviewGroup = (props: ReviewGropProps) => {
    const reviewList = useAppSelector(state => state.feedback.reviews);
    const [seeAllReview, setSeeAllReview] = useState(false)


    useEffect(() => {
        return
    }, [reviewList]);

    const onReviewToggle = () => {
        setSeeAllReview(!seeAllReview)
    }

    const fourReview = reviewList.slice(0, 4).map(item => {
        return (
            <Review item={item} key={item.id}/>
        )
    });

    const allReview = reviewList.map(item => {
        return (
            <Review item={item} key={item.id}/>
        )
    });

    return (
        <section className={s.review_group_section}>
            <div className={s.review_group}>
                {seeAllReview ? allReview : fourReview}
            </div>
            <div className={s.review_button_group}>
                <Button type="primary" className={s.review_button} onClick={props.showModalForm} data-test-id='write-review'>Написать отзыв</Button>
                <span className={s.review_text}
                      onClick={onReviewToggle}
                      data-test-id='all-reviews-button'>{seeAllReview ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}</span>
            </div>

        </section>
    );
};
