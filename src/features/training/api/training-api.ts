import {instance} from '../../../common/api';

export const trainingApi = {
    getTrainingPalsList: () => instance.get('catalogs/training-pals'),
    getUserJointTraining: (trainingType: string) => instance.get(`catalogs/user-joint-training-list?trainingType=${trainingType}`),
    getAllUserJointTraining: () => instance.get(`catalogs/user-joint-training-list`),
};


