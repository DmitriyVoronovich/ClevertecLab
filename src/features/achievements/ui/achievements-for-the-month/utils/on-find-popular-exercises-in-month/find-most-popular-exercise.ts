import {ExerciseCount} from '../../types/types.ts';

export const findMostPopularExercise = (exerciseCount: ExerciseCount) => {
    if (Object.keys(exerciseCount).length === 0) {
        return { exercise: null, count: 0 };
    }

    const mostPopularKey = Object.keys(exerciseCount).reduce((a, b) => exerciseCount[a] > exerciseCount[b] ? a : b);

    return {
        exercise: mostPopularKey,
        count: exerciseCount[mostPopularKey]
    };
};
