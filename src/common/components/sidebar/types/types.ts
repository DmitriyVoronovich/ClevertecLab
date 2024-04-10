export type NavigationMenuDataProps = {
    id: number,
    title: string,
    icon: string,
    callback: any,
    dataNotId: string
};

export type SidebarProps = {
    handleOpen: () => void;
    open: boolean;
};
