import {NavigationMenuDataProps, SidebarProps} from '@components/sidebar/types/types.ts';
import {NavigationMenuData} from '@data/data.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import exit from '@image/image/exit.svg';
import menuIcon from '@image/image/svg-menu/menu.svg';
import {pushWithFlow} from '@utils/pushWithFlow.ts';
import Badge from 'antd/lib/badge';
import classNames from 'classnames';

import {Logo} from '../logo';

import './sidebar.css';

export const Sidebar = ({handleOpen, open}: SidebarProps) => {
    const dispatch = useAppDispatch();
    const inviteList = useAppSelector((state) => state.invite.inviteList);
    const badgeCount = (item: NavigationMenuDataProps) => item.title === 'Тренировки' ? inviteList.length : 0

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
        'close': !open
    });

    const sidebarLogContainer = classNames({
        'sidebar_logo_container': true,
        'close_logo_item': !open
    });

    const sidebarItemTitle = classNames({
        'sidebar_item_title': true,
        'close': !open
    });

    const logOut = () => {
        localStorage.removeItem('jwtToken');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('isLoggedIn');
        dispatch(pushWithFlow('/auth'));
    };

    const menu = NavigationMenuData.map((item) => {
        const onClickHandler = () => {
            dispatch(item.callback);
        };

        return (
            <Badge count={badgeCount(item)} data-test-id={item.dataNotId} key={item.id}>
                <div className="sidebar_menu_item"
                     key={item.id}
                     onClick={onClickHandler}>
                    <img src={item.icon} alt="menu icon" className="sidebar_item_icon"/>
                    <span className={sidebarItemTitle}>
                    {item.title}
                </span>
                </div>
            </Badge>
        );
    });

    return (
        <div className={sidebarContentContainer}>
            <div className={sidebarMenuWrapper}>
                <div className={sidebarLogContainer}>
                    <Logo open={open}/>
                </div>
                <div className="sidebar_menu_list">{menu}</div>
            </div>
            <div className={sidebarFooter}
                 onClick={logOut}>
                <img src={exit} alt="exit button" className="sidebar_footer_img"/>
                <span className={sidebarFooterText}>
                    Выход
                </span>
            </div>
            <div className="sidebar_menu_button" onClick={handleOpen} data-test-id='sider-switch'>
                <img
                    src={menuIcon}
                    alt="menu button"
                    className="sidebar_menu_icon"
                    data-test-id='sider-switch-mobile'
                />
            </div>
        </div>
    );
};
