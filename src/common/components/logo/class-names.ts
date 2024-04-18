import classNames from 'classnames';

export const logoContainerClass = (open?: boolean) => classNames({
    logo_container: true,
    close_logo: !open
});

export const logoCleverClass = (open?: boolean) => classNames({
    logo_clever: true,
    close: !open
});
