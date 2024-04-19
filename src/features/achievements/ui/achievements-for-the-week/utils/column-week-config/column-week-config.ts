import {formateDate} from '../../../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {LoadByDateItem} from '../../../achievements-for-the-month/types/types.ts';

import {getWeekColumnWidth} from './get-week-column-width.ts';

export const columnWeekConfig = (selectedTraining: LoadByDateItem[], isMobile: boolean) => ({
        axis: {
            lineExtension: [0, 2],
            x: {
                tick: false,
            },
            y: {
                tick: false,
                labelFormatter: (datum: string) => `${datum} кг`,
            },
        },
        data: selectedTraining.map(item => ({
            date: formateDate(item.date).slice(0, 5),
            load: item.load
        })),
        xField: 'date',
        yField: 'load',
        width: getWeekColumnWidth(isMobile),
        style: {
            maxWidth: 30,
        },
        scrollbar: {type: 'horizontal'},
    })
