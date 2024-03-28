import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {pushWithFlow} from '@utils/pushWithFlow.ts';
import classNames from 'classnames';

import exit from '../../../accets/image/exit.svg';
import menuicon from '../../../accets/image/svg-menu/menu.svg';
import {NavigationMenuData} from '../../../data/data.ts';
import {Logo} from '../logo/Logo.tsx';

import './sidebar.css';

export type SidebarProps = {
    handleOpen: () => void;
    open: boolean;
};

export const Sidebar = ({handleOpen, open}: SidebarProps) => {
    const dispatch = useAppDispatch();

    const sidebarContentContainer = classNames({
        'sidebar_content_container': true,
        'close_menu': !open
    });

    const sidebarMenuWrapper = classNames({
        'sidebar_menu_wrapper': true,
        'close_menu_item': open
    });

    const sidebarFooter = classNames({
        'sidebar_footer': true,
        'close_menu_item': open
    });

    const sidebarFooterText = classNames({
        'sidebar_footer_text': true,
        'close': open
    });

    const logOut = () => {
        localStorage.removeItem('jwtToken');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('isLoggedIn');
        dispatch(pushWithFlow('/auth'));
    };

    const menu = NavigationMenuData.map((item) => {
        const onClickHandler = () => {
            dispatch(item.callback());
        };

        return (
            <div
                className="sidebar_menu_item"
                key={item.id}
                onClick={onClickHandler}
                data-test-id={item.dataId}
            >
                <img src={item.icon} alt="menu icon" className="sidebar_item_icon"/>
                <span className={`${open ? 'sidebar_item_title' : 'sidebar_item_title close'}`}>
                    {item.title}
                </span>
            </div>
        );
    });

    return (
        <div
            className={sidebarContentContainer}
        >
            <div
                className={sidebarMenuWrapper}
            >
                <div
                    className={`${
                        open ? 'sidebar_logo_container' : 'sidebar_logo_container close_logo_item'
                    }`}
                >
                    <Logo open={open}/>
                </div>
                <div className="sidebar_menu_list">{menu}</div>
            </div>
            <div
                className={sidebarFooter}
                onClick={logOut}
            >
                <img src={exit} alt="exit button" className="sidebar_footer_img"/>
                <span className={sidebarFooterText}>
                    Выход
                </span>
            </div>
            <div className="sidebar_menu_button" onClick={handleOpen} data-test-id='sider-switch'>
                <img
                    src={menuicon}
                    alt="menu button"
                    className="sidebar_menu_icon"
                    data-test-id='sider-switch-mobile'
                />
            </div>
        </div>
    );
};
