import {
    findMostPopularExercise
} from '../../../achievements-for-the-month/utils/on-find-popular-exercises-in-month/find-most-popular-exercise.ts';
import {PopularExerciseByDate} from '../../types/types.ts';

export const formatPopularExercisesResults = (popularExercisesByDate: PopularExerciseByDate) => {
    return Object.keys(popularExercisesByDate).map(date => {
        const mostPopularExercise = findMostPopularExercise(popularExercisesByDate[date]);

        return {
            date,
            mostPopularExercise: mostPopularExercise.exercise,
            count: mostPopularExercise.count
        };
    });
};
