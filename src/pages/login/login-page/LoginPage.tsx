import './login-page.css';
import fon from "../../../accets/login-page/image/fon.png";
import {Logo} from "@components/logo/Logo.tsx";
import {LoginForm} from "@pages/login/login-page/login-form/LoginForm.tsx";
import {RegistrationForm} from "@pages/login/login-page/registration-form/RegistrationForm.tsx";
import {Link, Route, Routes, useLocation} from "react-router-dom";

export const LoginPage = () => {

    const location = useLocation()

    const locationPath= location.pathname.split('/')

    return (
        <div className={'login_form_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'form_fon'}></div>
            <div className={'login_form_wrapper'}>
                <div className={'logo_wrapper'}>
                    <Logo open={true}/>
                </div>
                <div className={'form_container'}>
                    <div className={'form_button_container'}>
                        <Link to={'/auth'} style={{width: '100%'}}>
                            <button className={`${locationPath.length !== 2 ? 'login_button' : 'login_button active'}`}>
                                Вход
                            </button>
                        </Link>
                        <Link to={'/auth/registration'} style={{width: '100%'}}>
                            <button className={`${locationPath.length === 2 ? 'login_button' : 'login_button active'}`}>
                                Регистрация
                            </button>
                        </Link>

                    </div>
                    <Routes>
                        <Route path={'/'} element={<LoginForm/>}/>
                        <Route path={'registration'} element={<RegistrationForm/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};
