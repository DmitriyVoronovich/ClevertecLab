import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onFindPopularExercises = (filterTraining) => {
    const popularExercisesByDate = {};

    // Проходимся по объектам тренировок
    for (let i = 0; i < filterTraining.length; i++) {
        const item = filterTraining[i];

        // Проверяем формат даты и приводим к нужному формату, если необходимо
        let dateObject;
        if ( /^\d+$/.test(item.date)) {
            dateObject = new Date(+item.date);
            dateObject.setUTCHours(0, 0, 0, 0);
        } else {
            dateObject = new Date(item.date);
        }
        const date = dateObject.toISOString();

        popularExercisesByDate[date] = popularExercisesByDate[date] || {}; // создаем объект для этой даты, если его еще нет
        const popularExercise = popularExercisesByDate[date]; // используем этот объект

        // Проходимся по упражнениям в тренировках
        for (let j = 0; j < item.exercises.length; j++) {
            const exercise = item.exercises[j];

            if (popularExercise[exercise.name]) {
                popularExercise[exercise.name]++;
            } else {
                popularExercise[exercise.name] = 1;
            }
        }
    }

    // Метод, который возвращает самую популярную запись
    const mostPopular = (obj) => {
        const mostPopularKey = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);

        return {
            exercise: mostPopularKey,
            count: obj[mostPopularKey]
        };
    };

    return Object.keys(popularExercisesByDate).map(date => {
        const mostPopularExercise = mostPopular(popularExercisesByDate[date]);

        return {
            date,
            mostPopularExercise: mostPopularExercise.exercise,
            count: mostPopularExercise.count
        };
    });
}
