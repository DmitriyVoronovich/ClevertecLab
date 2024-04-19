import {PopularExercisesByWeekDay} from '../../types/types.ts';

import {findMostPopularExercise} from './find-most-popular-exercise.ts';

export const formatResults = (popularExercisesByDay: PopularExercisesByWeekDay) => Object.keys(popularExercisesByDay).map(day => {
    const mostPopularExercise = findMostPopularExercise(popularExercisesByDay[parseInt(day, 10)]);

    return {
        date: day,
        mostPopularExercise: mostPopularExercise.exercise,
        count: mostPopularExercise.count
    };
});
