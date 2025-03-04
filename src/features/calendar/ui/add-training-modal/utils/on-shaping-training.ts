import { AppDispatch } from '@redux/configure-store.ts';

import { calendarThunks } from '../../../model/calendar-slice.ts';
import { TrainExercises, TrainingList } from '../../../model/types/types.ts';

export const onShapingTraining = (
    date: string,
    trainExercise: TrainExercises[],
    dispatch: AppDispatch,
    trainName?: TrainingList,
) => {
    const trainArg = {
        name: trainName?.name || '',
        date,
        isImplementation: false,
        parameters: {
            repeat: false,
            period: 1,
            jointTraining: false,
            participants: [],
        },
        exercises: trainExercise,
    };

    dispatch(calendarThunks.addTraining(trainArg));
};
