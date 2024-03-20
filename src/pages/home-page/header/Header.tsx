import set from '../../../accets/image/set.svg';
import './header.css';

export const Header = () => {
    return (
        <div className={'header_container'}>
            <div className={'header_menu'}>
                <span className={'header_menu_item'}>Главная</span>
            </div>
            <div className={'header_wrapper'}>
                <h1 className={'header_title'}>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </h1>
                <div className={'header_content_wrapper'}>
                    <img src={set} className={'header_content_svg'} alt={'Настройки'} />
                    <span className={'header_content_item'}>Настройки</span>
                </div>
            </div>
        </div>
    );
};
