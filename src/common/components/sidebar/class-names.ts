import classNames from 'classnames';

export const sidebarContentContainerClass = (open: boolean) => classNames({
    'sidebar_content_container': true,
    'close_menu': !open
});

export const sidebarMenuWrapperClass = (open: boolean) => classNames({
    'sidebar_menu_wrapper': true,
    'close_menu_item': open
});

export const sidebarFooterClass = (open: boolean) => classNames({
    'sidebar_footer': true,
    'close_menu_item': open
});

export const sidebarFooterTextClass = (open: boolean) => classNames({
    'sidebar_footer_text': true,
    'close': !open
});

export const sidebarLogContainerClass = (open: boolean) => classNames({
    'sidebar_logo_container': true,
    'close_logo_item': !open
});

export const sidebarItemTitleClass = (open: boolean) => classNames({
    'sidebar_item_title': true,
    'close': !open
});
