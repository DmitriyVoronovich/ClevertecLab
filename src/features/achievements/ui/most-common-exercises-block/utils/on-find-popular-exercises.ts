import {TrainingParams} from '../../../../calendar/model/types/types.ts';
import {ExerciseCount} from "../../achievements-for-the-month/types/types.ts";
import {MostPopularExercise, PopularExerciseByDate} from "../types/types.ts";

export const onFindPopularExercises = (filterTraining: TrainingParams[]) => {
    const popularExercisesByDate: PopularExerciseByDate = {};

    for (let i = 0; i < filterTraining.length; i++) {
        const item = filterTraining[i];

        let dateObject;
        if ( /^\d+$/.test(item.date)) {
            dateObject = new Date(+item.date);
            dateObject.setUTCHours(0, 0, 0, 0);
        } else {
            dateObject = new Date(item.date);
        }
        const date = dateObject.toISOString();

        popularExercisesByDate[date] = popularExercisesByDate[date] || {};
        const popularExercise = popularExercisesByDate[date];

        for (let j = 0; j < item.exercises.length; j++) {
            const exercise = item.exercises[j];

            if (popularExercise[exercise.name]) {
                popularExercise[exercise.name]++;
            } else {
                popularExercise[exercise.name] = 1;
            }
        }
    }

    const mostPopular = (obj: ExerciseCount): MostPopularExercise => {
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
};
