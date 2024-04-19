import {
    DEFAULT_COLUMN_HEIGHT,
    DEFAULT_COLUMN_WITCH, MOBILE_COLUMN_HEIGHT,
    MOBILE_COLUMN_WITCH,
    TABLET_COLUMN_WITCH
} from '../constant/constant.ts';

export const  getWidth = (isMobile: boolean, isTablet: boolean) => {
    if (isMobile) {
        return MOBILE_COLUMN_WITCH;
    }

    return isTablet ? TABLET_COLUMN_WITCH : DEFAULT_COLUMN_WITCH;
};

export const  getHeight = (isMobile: boolean) => isMobile ? MOBILE_COLUMN_HEIGHT : DEFAULT_COLUMN_HEIGHT;
