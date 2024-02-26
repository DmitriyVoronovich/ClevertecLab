import './error-check-email.css'
import fon from "../../../accets/login-page/image/fon.png";
import error from "../../../accets/login-page/svg-icon/error.svg";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

export const ErrorCheckEmail = () => {
    const navigation = useNavigate();

    const redirectToLogin = () => {
        navigation('/auth');


    }
    return (
        <div className={'log_error_check_em_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'error_check_em_container'}>
                <div className={'error_check_em_wrapper'}>
                    <img className={'error_check_em_img'} alt={'error'} src={error}/>
                    <h5 className={'error_check_em_title'}>Такой e-mail не зарегистрирован</h5>
                    <p className={'error_check_em_description'}>Мы не нашли в базе вашего e-mail.
                        Попробуйте войти с другим e-mail.</p>
                    <Button data-test-id='check-retry-button' type="primary"
                            className={'error_check_em_button'} onClick={redirectToLogin}>Попробовать
                        снова</Button>
                </div>
            </div>
        </div>
    );
};
