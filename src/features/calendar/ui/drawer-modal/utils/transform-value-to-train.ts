import { ExerciseItem } from '../../workout-edit-form/types/types.ts';

export const transformValueToTrain = (value: ExerciseItem[]) =>
    value.map((item: ExerciseItem) => ({
            name: item.name || '',
            replays: item.replays ? item.replays : 1,
            weight: item.weight ? item.weight : 0,
            approaches: item.approaches ? item.approaches : 1,
            isImplementation: false,
        }));
