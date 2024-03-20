import { Footer } from '@pages/home-page/footer/Footer.tsx';
import { Header } from '@pages/home-page/header/Header.tsx';
import { HomeSection } from '@pages/home-page/home-section/HomeSection.tsx';

export const HomePage = () => {
    return (
        <>
            <Header />
            <HomeSection />
            <Footer />
        </>
    );
};
