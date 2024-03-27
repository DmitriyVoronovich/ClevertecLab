import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

import ava from '../../../../accets/feedback-page/default_avatar.svg';
import { formateDate } from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';

import { ReviewProps } from './types/types.ts';

import './review.css';

export const Review: React.FC<ReviewProps> = ({ item }: ReviewProps) => {
    const { fullName, imageSrc, message, rating, createdAt } = item;

    return (
        <div className="review_container">
            <div className="review_user_wrapper">
                <img src={imageSrc || ava} className="review_user_avatar" alt="" />
                <span className="review_user_name">{fullName || 'Пользователь'}</span>
            </div>
            <div className="review_text_container">
                <div className="review_rate_wrapper">
                    <Rate
                        disabled={true}
                        value={rating}
                        className="review_rate"
                        style={{ fontSize: 16 }}
                        character={({ value, index }) => value && index! < value ? <StarFilled /> : <StarOutlined />}
                    />
                    <span className="review_date">{formateDate(createdAt)}</span>
                </div>
                <p className="review_text">{message}</p>
            </div>
        </div>
    );
};
