import {TrainingParams} from '../../../../../calendar/model/types/types.ts';
import {PopularExercisesByWeekDay} from '../../types/types.ts';

export const preparePopularExercisesData = (filterTraining: TrainingParams[]) => {
    const popularExercisesByDay: PopularExercisesByWeekDay = {0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}};

    filterTraining.forEach(item => {
        const dayOfWeek = (new Date(item.date).getDay() + 6) % 7;
        const popularExercise = popularExercisesByDay[dayOfWeek];

        item.exercises.forEach(exercise => {
            if (popularExercise[exercise.name]) {
                popularExercise[exercise.name] += 1;
            } else {
                popularExercise[exercise.name] = 1;
            }
        });
    });

    return popularExercisesByDay;
};
