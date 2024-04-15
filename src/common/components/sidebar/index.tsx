import {
    sidebarContentContainerClass,
    sidebarFooterClass,
    sidebarFooterTextClass,
    sidebarItemTitleClass,
    sidebarLogContainerClass,
    sidebarMenuWrapperClass
} from '@components/sidebar/class-names.ts';
import {NavigationMenuDataProps, SidebarProps} from '@components/sidebar/types/types.ts';
import {NavigationMenuData} from '@data/data.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import exit from '@image/image/exit.svg';
import menuIcon from '@image/image/svg-menu/menu.svg';
import {pushWithFlow} from '@utils/pushWithFlow.ts';
import Badge from 'antd/lib/badge';

import {Logo} from '../logo';

import './sidebar.css';

export const Sidebar = ({handleOpen, open}: SidebarProps) => {
    const dispatch = useAppDispatch();
    const inviteList = useAppSelector((state) => state.invite.inviteList);
    const badgeCount = (item: NavigationMenuDataProps) => item.title === 'Тренировки' ? inviteList.length : 0

    const sidebarContentContainer = sidebarContentContainerClass(open);

    const sidebarMenuWrapper = sidebarMenuWrapperClass(open);

    const sidebarFooter = sidebarFooterClass(open);

    const sidebarFooterText = sidebarFooterTextClass(open);

    const sidebarLogContainer = sidebarLogContainerClass(open);

    const sidebarItemTitle = sidebarItemTitleClass(open);

    const logOut = () => {
        localStorage.removeItem('jwtToken');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('isLoggedIn');
        dispatch(pushWithFlow('/auth'));
    };

    const menu = NavigationMenuData.map((item) => {
        const onClickHandler = () => dispatch(item.callback());

        return (
            <Badge count={badgeCount(item.title)} data-test-id={item.dataNotId} key={item.id}>
                <div className="sidebar_menu_item"
                     role='button'
                     tabIndex={0}
                     onKeyDown={onClickHandler}
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
                 role='button'
                 tabIndex={0}
                 onKeyDown={logOut}
                 onClick={logOut}>
                <img src={exit} alt="exit button" className="sidebar_footer_img"/>
                <span className={sidebarFooterText}>
                    Выход
                </span>
            </div>
            <div className="sidebar_menu_button"
                 onClick={handleOpen}
                 role='button'
                 tabIndex={0}
                 onKeyDown={handleOpen}
                 data-test-id='sider-switch'>
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
