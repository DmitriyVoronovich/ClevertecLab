import {formateDate} from '../../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {LoadByDateItem} from '../types/types.ts';

import {getHeight, getWidth} from './get-column-size.ts';

export const columnMonthConfig = (selectedTraining: LoadByDateItem[],
                                  isMobile: boolean,
                                  isTablet: boolean) => ({
    axis: {
        lineExtension: [0, 2],
        y: {
            tick: false,
            labelFormatter: (datum: string) => `${datum} кг`
        },
        x: {
            tick: false,
        },
    },
    data: selectedTraining.map((item: { date: string; load: any; }) => ({
        date: formateDate(item.date).slice(0, 5),
        load: item.load
    })),
    xField: 'date',
    yField: 'load',
    // no magic value and move to function
    width: getWidth(isMobile, isTablet),
    height: getHeight(isMobile),
    style: {
        maxWidth: 30,
    },
    scrollbar: {
        x: {
            ratio: 0.5,
        },
    },
})
