import {TrainingParams} from '../../../../../calendar/model/types/types.ts';
import {ExerciseCount} from '../../../achievements-for-the-month/types/types.ts';
import {PopularExerciseByDate} from '../../types/types.ts';

const preparePopularExercisesData = (filterTraining: TrainingParams[]) => {
    const popularExercisesByDate: PopularExerciseByDate = {};

    for (let i = 0; i < filterTraining.length; i++) {
        const item = filterTraining[i];

        let dateObject;
        if (/^\d+$/.test(item.date)) {
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
                popularExercise[exercise.name] += 1;
            } else {
                popularExercise[exercise.name] = 1;
            }
        }
    }

    return popularExercisesByDate;
};

const findMostPopularExercise = (exerciseCount: ExerciseCount) => {
    const mostPopularKey = Object.keys(exerciseCount).reduce((a, b) => exerciseCount[a] > exerciseCount[b] ? a : b);

    return {
        exercise: mostPopularKey,
        count: exerciseCount[mostPopularKey]
    };
};

const formatPopularExercisesResults = (popularExercisesByDate: PopularExerciseByDate) => {
    return Object.keys(popularExercisesByDate).map(date => {
        const mostPopularExercise = findMostPopularExercise(popularExercisesByDate[date]);

        return {
            date,
            mostPopularExercise: mostPopularExercise.exercise,
            count: mostPopularExercise.count
        };
    });
};

export const onFindPopularExercises = (filterTraining: TrainingParams[]) => {
    const popularExercisesData = preparePopularExercisesData(filterTraining);

    return formatPopularExercisesResults(popularExercisesData);
};
