import { AppDispatch } from '@redux/configure-store.ts';
import { calendarThunks } from '../../../model/calendarSlice.ts';
import { TrainExercises, TrainingList } from '../../../model/types/types.ts';

export const onShapingTraining = (
    trainName: TrainingList | undefined,
    date: string,
    trainExercise: TrainExercises[],
    dispatch: AppDispatch,
) => {
    const trainArg = {
        name: trainName?.name || '',
        date: date,
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
