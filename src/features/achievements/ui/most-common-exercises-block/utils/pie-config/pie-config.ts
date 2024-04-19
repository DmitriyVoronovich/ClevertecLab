import {TrainingDay} from '../../types/types.ts';

import {pieConfigDefault} from './constant.ts';
import {getPieHeight, getPieWidth} from './get-pie-size.ts';

export const pieConfig = (trainingDays: TrainingDay[], isMobile: boolean) => ({
    ...pieConfigDefault,
    data: trainingDays,
    width: getPieWidth(isMobile),
    height: getPieHeight(isMobile),
});
