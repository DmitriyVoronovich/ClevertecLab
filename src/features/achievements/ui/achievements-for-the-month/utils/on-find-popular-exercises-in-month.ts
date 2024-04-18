import {TrainingParams} from "../../../../calendar/model/types/types.ts";
import {ExerciseCount, PopularExercise, PopularExercisesByWeekDay} from "../types/types.ts";

export const onFindPopularExercisesInMonth = (filterTraining: TrainingParams[]) => {
    const popularExercisesByDay: PopularExercisesByWeekDay = {0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}};

    filterTraining.forEach(item => {
        const dayOfWeek = (new Date(item.date).getDay() + 6) % 7;
        const popularExercise = popularExercisesByDay[dayOfWeek];

        item.exercises.forEach(exercise => {
            if (popularExercise[exercise.name]) {
                popularExercise[exercise.name]++;
            } else {
                popularExercise[exercise.name] = 1;
            }
        });
    });

    const mostPopular = (obj: ExerciseCount): PopularExercise => {
        if (Object.keys(obj).length === 0) {
            return { exercise: null, count: 0 };
        }

        const mostPopularKey = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);

        return {
            exercise: mostPopularKey,
            count: obj[mostPopularKey]
        };
    };

    return Object.keys(popularExercisesByDay).map(day => {
        const mostPopularExercise = mostPopular(popularExercisesByDay[parseInt(day)]);

        return {
            date: day,
            mostPopularExercise: mostPopularExercise.exercise,
            count: mostPopularExercise.count
        };
    });
}
