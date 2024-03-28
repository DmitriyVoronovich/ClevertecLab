import { TrainExercises, TrainingList, TrainingParams } from '../../../model/types/types.ts';

export type WorkoutEditModalProps = {
    open: boolean;
    onEditDrawerModalClose: () => void;
    separateWorkout: TrainingParams;
    date: string;
    onAddTrainExercise: (train: TrainExercises[]) => void;
    selectedTrainingItem: TrainingList | undefined;
};
