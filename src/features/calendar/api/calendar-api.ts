import { instance } from '../../../common/api';
import { PostTrainingParams, TrainingParams } from '../model/types/types.ts';

export const calendarApi = {
    getTraining() {
        return instance.get('training');
    },
    getTrainingList() {
        return instance.get('catalogs/training-list');
    },
    setTraining(training: PostTrainingParams) {
        return instance.post('training', training);
    },
    editTraining(training: TrainingParams, trainingId: string) {
        return instance.put(`training/${trainingId}`, training);
    },
};
