import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import fon from '../../../../../accets/login-page/image/fon.png';
import suc from '../../../../../accets/login-page/svg-icon/success.svg';
import './successChangePassword.css';

export const SuccessChangePassword = () => {
    const navigation = useNavigate();

    const redirectToLogin = () => navigation('/auth');

    return (
        <div className={'success_change_fon_container'} style={{ backgroundImage: `url(${fon})` }}>
            <div className={'form_fon'}></div>
            <div className={'success_change_container'}>
                <div className={'error_wrapper'}>
                    <img className={'success_change_img'} alt={'error'} src={suc} />
                    <h5 className={'success_change_title'}>Пароль успешно изменен</h5>
                    <p className={'success_change_description'}>
                        Теперь можно войти в аккаунт, используя <br />
                        свой логин и новый пароль
                    </p>
                    <Button
                        data-test-id='change-entry-button'
                        type='primary'
                        className={'success_change_button'}
                        onClick={redirectToLogin}
                    >
                        Вход
                    </Button>
                </div>
            </div>
        </div>
    );
};
