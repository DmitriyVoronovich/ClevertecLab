import { AppDispatch } from '@redux/configure-store.ts';

import { feedbackThunks, setFeedbackReview } from '../../../model/feedback-slice.ts';

export const onFinishFeedback = (dispatch: AppDispatch, onCancelModalForm: () => void) => (values: any) => {
        dispatch(
            feedbackThunks.createReview({
                message: values.review,
                rating: values.rate,
            }),
        );
        dispatch(
            setFeedbackReview({
                feedbackReview: { message: values.review, rating: values.rate },
            }),
        );
        onCancelModalForm();
        dispatch(feedbackThunks.getReviews());
    };
