import set from '../../../../accets/image/set.svg';
import { CalendarSection } from '../calendar-section';
import { ErrorModal } from '../error-modal';

import s from './calendar-page.module.css';

export const CalendarPage = () => (
        <div className={s.container}>
            <div className={s.header_container}>
                <div>
                    Главная / <span className={s.header_menu_item}>Календарь</span>
                </div>
                <div className={s.header_content_wrapper}>
                    <img src={set} className={s.header_content_svg} alt="Настройки" />
                    <span className={s.header_content_item}>Настройки</span>
                </div>
            </div>
            <CalendarSection />
            <ErrorModal />
        </div>
    );
