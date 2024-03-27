import { TrainExercises } from '../../../model/types/types.ts';

export type DrawerModalProps = {
    onDrawerModalClose: () => void;
    selectTrain: string;
    date: string;
    onAddTrainExercise: (train: TrainExercises[]) => void;
    trainExercise: TrainExercises[];
};
