import { Button } from 'antd';
import './error-login.css'
import fon from "../../../accets/login-page/image/fon.png";
import error from "../../../accets/login-page/svg-icon/error-icon.svg";

export const ErrorLogin = () => {
    return (
        <div className={'log_error_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'error_container'}>
                <div className={'error_wrapper'}>
                    <img className={'error_img'} alt={'error'} src={error}/>
                    <h5 className={'error_title'}>Вход не выполнен</h5>
                    <p className={'error_description'}>Что-то пошло не так. Попробуйте ещё раз</p>
                    <Button type="primary" className={'error_button'}>Повторить</Button>
                </div>
            </div>
        </div>
    );
};
