import {TrainingParams} from '../../../../../calendar/model/types/types.ts';

export const findPopularWorkout = (workouts: TrainingParams[]) => {
    const workoutLoad = workouts.reduce((acc: { [key: string]: number }, workout) => {
        const load = workout.exercises.reduce((accum: number, {
            replays,
            weight,
            approaches
        }) => accum + replays * weight * approaches, 0);

        return ({
            ...acc,
            [workout.name]: (acc[workout.name] || 0) + load,
        });
    }, {});

    return Object.keys(workoutLoad).reduce((a, b) => workoutLoad[a] > workoutLoad[b] ? a : b);
};
