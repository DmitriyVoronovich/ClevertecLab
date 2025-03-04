import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

import andr from '@image/image/andr.svg';
import apple from '@image/image/apple.svg';
import { feedbackThunks } from '../../../features/feedback/model/feedback-slice.ts';

import './footer.css';

export const Footer = () => {
    const dispatch = useAppDispatch();

    const onSubmittingReviewRequest = () => dispatch(feedbackThunks.getReviews());

    return (
        <div className="footer_container">
            <div className="footer_reviews_container" onClick={onSubmittingReviewRequest}>
                <a className="footer_reviews" data-test-id='see-reviews'>
                    Смотреть отзывы
                </a>
            </div>
            <div className="footer_app_container">
                <div className="footer_app_link_wrapper">
                    <a className="footer_app_link">Скачать на телефон</a>
                    <span className="footer_app_text">Доступно в PRO-версии</span>
                </div>
                <div className="app_container">
                    <button className="app_button">
                        <img src={andr} alt='icon' className="app_icon" />
                        <span className="app_button_name">Android OS</span>
                    </button>
                    <button className="app_button">
                        <img src={apple} alt='icon' className="app_icon" />
                        <span className="app_button_name">Apple OS</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
