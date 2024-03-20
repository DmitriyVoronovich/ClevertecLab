import { TrainExercises } from '../../../model/types/types.ts';

export const transformDate = (
    name: string,
    date: string,
    isImplementation: boolean,
    trainExercise: TrainExercises[],
) => {
    return {
        name: name || '',
        date: date,
        isImplementation: !!isImplementation,
        parameters: {
            repeat: false,
            period: 1,
            jointTraining: false,
            participants: [],
        },
        exercises: trainExercise,
    };
};
