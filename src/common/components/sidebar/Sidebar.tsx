import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

import exit from '../../../accets/image/exit.svg';
import menuicon from '../../../accets/image/svg-menu/menu.svg';
import { NavigationMenuData } from '../../../data/data.ts';
import { Logo } from '../logo/Logo.tsx';

import './sidebar.css';
import {pushWithFlow} from '@utils/pushWithFlow.ts';

export type SidebarProps = {
    handleOpen: () => void;
    open: boolean;
};

export const Sidebar = ({ handleOpen, open }: SidebarProps) => {
    const dispatch = useAppDispatch();

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
                <img src={item.icon} alt="menu icon" className="sidebar_item_icon" />
                <span className={`${open ? 'sidebar_item_title' : 'sidebar_item_title close'}`}>
                    {item.title}
                </span>
            </div>
        );
    });

    return (
        <div
            className={`${
                open ? 'sidebar_content_container' : 'sidebar_content_container close_menu'
            }`}
        >
            <div
                className={`${
                    open ? 'sidebar_menu_wrapper' : 'sidebar_menu_wrapper close_menu_item'
                }`}
            >
                <div
                    className={`${
                        open ? 'sidebar_logo_container' : 'sidebar_logo_container close_logo_item'
                    }`}
                >
                    <Logo open={open} />
                </div>
                <div className="sidebar_menu_list">{menu}</div>
            </div>
            <div
                className={`${open ? 'sidebar_footer' : 'sidebar_footer close_menu_item'}`}
                onClick={logOut}
            >
                <img src={exit} alt="exit button" className="sidebar_footer_img" />
                <span className={`${open ? 'sidebar_footer_text' : 'sidebar_footer_text close'}`}>
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
