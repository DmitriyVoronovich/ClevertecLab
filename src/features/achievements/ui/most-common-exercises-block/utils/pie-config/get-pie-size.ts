import {TABLET_COLUMN_WITCH} from '../../../achievements-for-the-month/constant/constant.ts';
import {MOBILE_WEEK_COLUMN_WIDTH} from '../../../achievements-for-the-week/constant/constant.ts';

import {DEFAULT_PIE_HEIGHT, MOBILE_PIE_WITCH} from './constant.ts';

export const  getPieWidth = (isMobile: boolean) => isMobile ? MOBILE_WEEK_COLUMN_WIDTH : TABLET_COLUMN_WITCH;

export const  getPieHeight = (isMobile: boolean) => isMobile ? MOBILE_PIE_WITCH : DEFAULT_PIE_HEIGHT;
