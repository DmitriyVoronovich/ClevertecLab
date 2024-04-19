import {formateDate} from '../../../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {onGettingPopularTrain} from '../on-getting-populartrain/on-getting-populartrain.ts';

export const onTransformDataDate = (resultList: Array<{ date: string, mostPopularExercise: string, count: number }>) => {

    const modifiedByDateArray = onGettingPopularTrain(resultList).map(item => {
        const date = !isNaN(Number(item.date))
            ? new Date(Number(item.date))
            : new Date(item.date);

        return {
            date: formateDate(`${date}`),
            mostPopularExercise: item.mostPopularExercise,
            count: item.count,
            dayOfWeek: date.getDay()
        };
    });

    modifiedByDateArray.sort((a, b) => {
        const dayA = a.dayOfWeek || 7;
        const dayB = b.dayOfWeek || 7;

        return dayA - dayB;
    });

    return modifiedByDateArray.map((item) => {
        const [day, month, year] = item.date.split('.');
        const dateObject = new Date(Number(year), Number(month) - 1, Number(day));
        const formatter = new Intl.DateTimeFormat('ru', {
            weekday: 'long',
        });

        return {
            date: item.date,
            mostPopularExercise: item.mostPopularExercise,
            count: item.count,
            dayOfWeek: formatter.format(dateObject)
        }
    });
};
