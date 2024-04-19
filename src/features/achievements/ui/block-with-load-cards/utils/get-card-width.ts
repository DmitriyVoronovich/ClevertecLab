import {DEFAULT_CARD_WIDTH, MOBILE_CARD_WIDTH} from '../constant/constant.ts';

export const getCardWidth = (isMobile: boolean)  => isMobile ? {width: MOBILE_CARD_WIDTH} : {width: DEFAULT_CARD_WIDTH}
