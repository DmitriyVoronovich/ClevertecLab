import s from "./calendarPage.module.css";
import set from "../../../../accets/image/set.svg";
import {CalendarSection} from "../calendarSection/CalendarSection.tsx";
import {ErrorModal} from "../errorModal/ErrorModal.tsx";

export const CalendarPage = () => {

    return (
        <div className={s.container}>
            <div className={s.header_container}>
                <div className={s.header_menu}>
                    Главная / <span className={s.header_menu_item}>Календарь</span>
                </div>
                <div className={s.header_content_wrapper}>
                    <img src={set} className={s.header_content_svg} alt={'Настройки'}/>
                    <span className={s.header_content_item}>Настройки</span>
                </div>
            </div>
            <CalendarSection/>
            <ErrorModal />
        </div>
    );
};
