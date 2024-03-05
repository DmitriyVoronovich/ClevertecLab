import React from 'react';
import {Header} from "@pages/home-page/header/Header.tsx";
import {HomeSection} from "@pages/home-page/home-section/HomeSection.tsx";
import {Footer} from "@pages/home-page/footer/Footer.tsx";



export const HomePage: React.FC = () => {

    return (
        <>
            <Header/>
            <HomeSection/>
            <Footer />
        </>
    );
};
