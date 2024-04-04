import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export type EditTrainingModal = {
    onClose: () => void
    separateWorkout: TrainingParams
};
