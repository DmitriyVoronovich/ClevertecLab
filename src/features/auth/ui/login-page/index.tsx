import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Logo } from '@components/logo';
import classNames from 'classnames';

import fon from '../../../../assets/login-page/image/fon.png';
import { LoginForm } from '../login-form';
import { RegistrationForm } from '../registration-form';

import './login-page.css';

export const LoginPage = () => {
    const location = useLocation();
    const locationPath = location.pathname.split('/');
    const isActive = locationPath.length === 2;

    const loginButton = classNames({'login_button': true, 'active': isActive});
    const registrationButton = classNames({'login_button': true, 'active': !isActive});

    return (
        <div className="login_form_container" style={{ backgroundImage: `url(${fon})` }}>
            <div className="form_fon" />
            <div className="login_form_wrapper">
                <div className="logo_wrapper">
                    <Logo open={true} />
                </div>
                <div className="form_container">
                    <div className="form_button_container">
                        <Link to="/auth" style={{ width: '100%' }}>
                            <button className={loginButton}>
                                Вход
                            </button>
                        </Link>
                        <Link to="/auth/registration" style={{ width: '100%' }}>
                            <button className={registrationButton}>
                                Регистрация
                            </button>
                        </Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="registration" element={<RegistrationForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
