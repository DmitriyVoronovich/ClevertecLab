import { Button } from 'antd';
import './error-registration.css'
import fon from "../../../accets/login-page/image/fon.png";
import error from "../../../accets/login-page/svg-icon/error.svg";
import {useNavigate} from "react-router-dom";

export const ErrorRegistration = () => {
    const navigation = useNavigate();

    const redirectToRegistration = () => {
        navigation('/auth/registration');
    }

    return (
        <div className={'log_error_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'error_container'}>
                <div className={'error_wrapper'}>
                    <img className={'error_img'} alt={'error'} src={error}/>
                    <h5 className={'error_title'}>Данные не сохранились</h5>
                    <p className={'error_description'}>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.</p>
                    <Button type="primary" className={'error_button'} onClick={redirectToRegistration}>Назад к регистрации</Button>
                </div>
            </div>
        </div>
    );
};
