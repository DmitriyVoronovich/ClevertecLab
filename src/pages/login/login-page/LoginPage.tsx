import './login-page.css';
import fon from "../../../accets/login-page/image/fon.png";
import {Logo} from "@components/logo/Logo.tsx";
import {useState} from "react";
import {LoginForm} from "@pages/login/login-page/login-form/LoginForm.tsx";
import {RegistrationForm} from "@pages/login/login-page/registration-form/RegistrationForm.tsx";

export const LoginPage = () => {

    const [active, setActive] = useState(true)

    const toggleActiveButton = () => {
        setActive(!active)
    }

    return (
        <div className={'login_form_container'} style={{backgroundImage: `url(${fon})`}}>
            <div className={'login_form_wrapper'}>
                <div className={'logo_wrapper'}>
                    <Logo open={true}/>
                </div>
                <div className={'form_container'}>
                    <div className={'form_button_container'}>
                        <button className={`${active ? 'login_button active' : 'login_button'}`} onClick={toggleActiveButton}>Вход</button>
                        <button className={`${active ? 'login_button' : 'login_button active'}`} onClick={toggleActiveButton}>Регистрация</button>
                    </div>
                    {active ? <LoginForm/> : <RegistrationForm/>}

                </div>
            </div>
        </div>
    );
};
