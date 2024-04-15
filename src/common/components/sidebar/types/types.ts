import {RootState} from '@redux/configure-store.ts';
import {Action, ThunkAction} from '@reduxjs/toolkit';

export type NavigationMenuDataProps = {
    id: number,
    title: string,
    icon: string,
    callback: () => ThunkAction<void, RootState, null, Action<string>>,
    dataNotId: string
};

export type SidebarProps = {
    handleOpen: () => void;
    open: boolean;
};
