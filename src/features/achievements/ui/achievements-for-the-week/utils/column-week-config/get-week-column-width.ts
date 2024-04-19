import {TABLET_COLUMN_WITCH} from '../../../achievements-for-the-month/constant/constant.ts';
import {MOBILE_WEEK_COLUMN_WIDTH} from '../../constant/constant.ts';

export const  getWeekColumnWidth = (isMobile: boolean) => isMobile ? MOBILE_WEEK_COLUMN_WIDTH : TABLET_COLUMN_WITCH;
