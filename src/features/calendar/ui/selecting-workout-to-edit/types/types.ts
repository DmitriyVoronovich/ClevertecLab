import { TrainingParams } from '../../../model/types/types.ts';

export type SelectingWorkoutToEditProps = {
    onCloseEditModal: () => void;
    modalStyle: {
        left: number;
        top: number;
    };
    date: string;
    onClose: () => void;
    separateWorkout: TrainingParams;
    addButtonBlock: boolean;
};
