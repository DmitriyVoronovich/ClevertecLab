import React from 'react';
import './main-page.css';
import {Header} from "@pages/main-page/header/Header.tsx";
import {MainSection} from "@pages/main-page/main-section/MainSection.tsx";
import fon from "../../accets/main_page_light.png";
import {Footer} from "@pages/main-page/footer/Footer.tsx";
import {Sidebar} from "@components/sidebar/Sidebar.tsx";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";

export const MainPage: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    console.log(isLoggedIn);

    const token = localStorage.getItem('jwtToken');

    if (!token && !isLoggedIn) {
        window.location.href = '/auth';
    }

    if (!token && !isLoggedIn) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <h1>Загрузка...</h1>
            </div>
        );
    }

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={'main_page_container'} style={{backgroundImage: `url(${fon})`}}>
            <Sidebar handleOpen={handleOpen} open={open}/>
            <div className={'a'}>
                <Header/>
                <MainSection/>
                <Footer/>
            </div>
        </div>
    );
};
