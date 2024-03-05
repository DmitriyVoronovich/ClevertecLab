import './token-request-error.css'
import error from "../../../accets/login-page/svg-icon/error_check.svg";
import {Button, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import { setFeedbackStatus} from "../../../features/feedback/feedback.reducer.ts";
import {useEffect, useState} from "react";

export const TokenRequestError:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const feedbackStatus = useAppSelector(state => state.feedback.feedbackStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (feedbackStatus === 'failed') {
            return setIsModalOpen(true);
        }
    });

    const onCancelModalForm = () => {
        setIsModalOpen(false);
        dispatch(setFeedbackStatus({feedbackStatus: 'idle'}));
        navigation('/main');
    };

    return (
            <Modal className={'error_request_container'} open={isModalOpen} closable={false} footer={null}>
                <div className={'error_request_wrapper'}>
                    <img className={'error_request_img'} alt={'error'} src={error}/>
                    <h5 className={'error_title'}>Что-то пошло не так</h5>
                    <p className={'error_request_description'}>Произошла ошибка, попробуйте ещё раз.</p>
                    <Button  type="primary" className={'error_request_button'} onClick={onCancelModalForm}>Назад</Button>
                </div>
            </Modal>
    );
};
