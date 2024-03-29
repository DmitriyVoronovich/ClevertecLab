import { useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button } from 'antd';

import { Review } from '../review';

import { ReviewGroupProps } from './types/types.ts';

import s from './review-group.module.css';

export const ReviewGroup = ({ showModalForm }: ReviewGroupProps) => {
    const reviewList = useAppSelector((state) => state.feedback.reviews);
    const [seeAllReview, setSeeAllReview] = useState(false);

    const onReviewToggle = () => setSeeAllReview(!seeAllReview);

    const fourReview = reviewList.slice(0, 4).map((item) => <Review item={item} key={item.id} />);

    const allReview = reviewList.map((item) => <Review item={item} key={item.id} />);

    return (
        <section className={s.review_group_section}>
            <div className={s.review_group}>{seeAllReview ? allReview : fourReview}</div>
            <div className={s.review_button_group}>
                <Button
                    type='primary'
                    className={s.review_button}
                    onClick={showModalForm}
                    data-test-id='write-review'
                >
                    Написать отзыв
                </Button>
                <span
                    className={s.review_text}
                    onClick={onReviewToggle}
                    data-test-id='all-reviews-button'
                >
                    {seeAllReview ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </span>
            </div>
        </section>
    );
};
