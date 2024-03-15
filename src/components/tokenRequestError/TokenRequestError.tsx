import {useEffect, useState} from "react";
import error from "../../accets/login-page/svg-icon/error_check.svg";
import {Button, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import './tokenRequestError.css';

type TokenRequestErrorProps = {
    callback: () => void
    status: string
}

export const TokenRequestError:React.FC<TokenRequestErrorProps> = (props) => {
    const navigation = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (props.status === 'failed') {
            return setIsModalOpen(true);
        }
    });

    const onCancelModalForm = () => {
        setIsModalOpen(false);
        props.callback();
        navigation('/main');
    };



    return (
            <Modal className={'error_request_container'} open={isModalOpen} closable={false} footer={null} data-test-id='modal-no-review'>
                <div className={'error_request_wrapper'}>
                    <img className={'error_request_img'} alt={'error'} src={error}/>
                    <h5 className={'error_title'}>Что-то пошло не так</h5>
                    <p className={'error_request_description'}>Произошла ошибка, попробуйте ещё раз.</p>
                    <Button  type="primary" className={'error_request_button'} onClick={onCancelModalForm}>Назад</Button>
                </div>
            </Modal>
    );
};
