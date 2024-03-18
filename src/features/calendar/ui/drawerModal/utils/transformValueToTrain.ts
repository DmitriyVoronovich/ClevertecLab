import {TrainExercises} from "../../../model/types/types.ts";

export const transformValueToTrain = (value: TrainExercises[]) => value.map((item) => {
    return {
        name: item.name || '',
        replays: item.replays ? item.replays : 1,
        weight: item.weight ? item.weight : 0,
        approaches: item.approaches ? item.approaches : 1,
        isImplementation: false
    }
});
