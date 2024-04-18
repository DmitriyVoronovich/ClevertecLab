import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onGettingWeekTraining = (training: TrainingParams[]) => {

    const loadByDate = training.reduce((accum, item) => {
        // Проверка формата даты. Если она в формате миллисекунд, преобразуем её в ISO 8601
        let dateObject;
        if ( /^\d+$/.test(item.date)) {
            dateObject = new Date(+item.date);
            dateObject.setUTCHours(0, 0, 0, 0);
        } else {
            dateObject = new Date(item.date);
        }
        const date = dateObject.toISOString();

        // Получаем всю нагрузку на день
        const load = item.exercises.reduce((sum, exercise) =>
            sum + exercise.approaches * exercise.weight * exercise.replays, 0);

        // Если дата уже присутствует в объекте, добавляем нагрузку к текущей сумме
        if (accum[date]) {
            accum[date] += load;
        }
        // Если даты ещё нет в объекте, добавляем новый элемент вместе с датой и нагрузкой
        else {
            accum[date] = load;
        }

        return accum;
    }, {});

    // Преобразуем объект в массив
    const loadByDateArray = Object.entries(loadByDate).map(([date, load]) => ({date, load}));

    const lastSevenDays = Array(7).fill(null).map((_, index) => {
        const date = new Date();

        date.setUTCHours(0, 0, 0, 0)
        date.setDate(date.getDate() - index);

        return date.toISOString();
    });

    lastSevenDays.forEach(day => {

        const existingDay = loadByDateArray.find(({ date }) => date === day);

        if (!existingDay) {
            loadByDateArray.push({
                date: day,
                load: 0
            });
        }
    });

    return loadByDateArray.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });
}
