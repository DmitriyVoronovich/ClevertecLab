import React from 'react';
import './main-page.css';
import {Header} from "@pages/main-page/header/Header.tsx";
import {MainSection} from "@pages/main-page/main-section/MainSection.tsx";
import fon from "../../accets/main_page_light.png";

export const MainPage: React.FC = () => {

    return (
        <div className={'main_page_container'} style={{ backgroundImage: `url(${fon})`,
            backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
            <Header/>
            <MainSection/>
        </div>
    );
};
