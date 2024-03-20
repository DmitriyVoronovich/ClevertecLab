import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { FeedbackFormProps } from './types/types.ts';
import { onFinishFeedback } from './utils/onFinishFeedback.ts';
import './feedbackForm.css';

export const FeedbackForm = ({ isModalOpen, onCancelModalForm }: FeedbackFormProps) => {
    const dispatch = useAppDispatch();
    const review = useAppSelector((state) => state.feedback.review);
    const [reviewData] = useState({ review: review.message, rate: review.rating });
    const [disabled, setDisabled] = useState(review.rating === undefined || review.rating === 0);

    const onFinish = onFinishFeedback(dispatch, onCancelModalForm);

    const onFieldsChange = (_: any, allFields: any) => {
        const rateField = allFields.find((field: { name: string[] }) => field.name[0] === 'rate');

        if (rateField) {
            setDisabled(false);
        }
    };

    return (
        <Modal
            className={'feedback_container'}
            open={isModalOpen}
            footer={null}
            centered
            title={'Ваш отзыв'}
            onCancel={onCancelModalForm}
        >
            <Form onFinish={onFinish} className={'feedback_form'} onFieldsChange={onFieldsChange}>
                <Form.Item name='rate' className={'rate_form'}>
                    <Rate
                        className='feedback_rate'
                        character={({ value, index }) =>
                            value && index! < value ? <StarFilled /> : <StarOutlined />
                        }
                        defaultValue={reviewData.rate}
                    />
                </Form.Item>

                <Form.Item name='review' className={'textarea_form'}>
                    <TextArea
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                        className={'feedback_textarea'}
                        style={{ height: '46px' }}
                        defaultValue={reviewData.review || ''}
                        autoSize={{ minRows: 2 }}
                    />
                </Form.Item>

                <Form.Item className={'button_form'}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className={'feedback_button'}
                        disabled={disabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
