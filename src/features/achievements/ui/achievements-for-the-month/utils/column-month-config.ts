import {formateDate} from "../../../../calendar/ui/drawer-modal/utils/formate-date.ts";
import {LoadByDateItem} from "../types/types.ts";

export const columnMonthConfig = (selectedTraining: LoadByDateItem[],
                                  isMobile: boolean,
                                  isTablet: boolean) => {
    return {
        axis: {
            lineExtension: [0, 2],
            y: {
                tick: false,
                labelFormatter: (datum: any) => `${datum} кг`
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
        width: isMobile ? 326 : isTablet ? 520 : 1136,
        height: isMobile ? 236 : isTablet ? 374 : 374,
        style: {
            maxWidth: 30,
        },
        scrollbar: {
            x: {
                ratio: 0.5,
            },
        },
    };
}
