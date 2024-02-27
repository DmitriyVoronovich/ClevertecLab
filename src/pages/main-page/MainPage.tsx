import React from 'react';
import './main-page.css';
import {Header} from "@pages/main-page/header/Header.tsx";
import {MainSection} from "@pages/main-page/main-section/MainSection.tsx";
import fon from "../../accets/main_page_light.png";
import {Footer} from "@pages/main-page/footer/Footer.tsx";
import {Sidebar} from "@components/sidebar/Sidebar.tsx";

export const MainPage: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const token = localStorage.getItem('jwtToken')
    let tog
    if (token!==null) {
         tog = JSON.parse(token)
    }

    let isLoggedIn

    const data = sessionStorage.getItem('isLoggedIn');
    if (data !== null) {
        isLoggedIn = JSON.parse(data)
    } else {
        console.log('error');
    }

    if (!tog && !isLoggedIn) {
        window.location.href = '/auth';
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
