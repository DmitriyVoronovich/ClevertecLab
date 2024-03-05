import './error-result.css';
import error from "../../accets/login-page/svg-icon/error.svg";
import {Button, Modal} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import { setFeedbackStatus} from "../../features/feedback/feedback.reducer.ts";
import {useEffect, useState} from "react";

type ErrorResultProps = {
    showModalForm: () => void
}

export const ErrorResult = (props:ErrorResultProps) => {
    const dispatch = useAppDispatch();
    const feedbackStatus = useAppSelector(state => state.feedback.feedbackStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (feedbackStatus === 'error') {
            return setIsModalOpen(true)
        }
    });

    const onModalClose= () => {
        dispatch(setFeedbackStatus({feedbackStatus: 'idle'}))
        props.showModalForm()
        setIsModalOpen(false)
    }

    const onErrorModalClose = () => {
        dispatch(setFeedbackStatus({feedbackStatus: 'idle'}))
        setIsModalOpen(false)
    }

    return (
            <Modal className={'error_result_container'} open={isModalOpen} closable={false} centered footer={null}>
                <div className={'error_result_wrapper'}>
                    <img className={'error_result_img'} alt={'error'} src={error}/>
                    <h5 className={'error_title'}>Данные не сохранились</h5>
                    <p className={'error_result_description'}>Что-то пошло не так.Попробуйте ещё раз.</p>
                    <div className={'error_result_button_cont'}>
                        <Button type="primary" className={'error_result_button'} data-test-id='write-review-not-saved-modal' onClick={onModalClose}>
                            Написать отзыв
                        </Button>
                        <Button className={'error_result_button_def'} onClick={onErrorModalClose}>Закрыть</Button>
                    </div>
                </div>
            </Modal>
    );
};
