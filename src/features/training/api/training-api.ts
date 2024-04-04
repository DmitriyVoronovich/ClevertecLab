import {instance} from '../../../common/api';

export const trainingApi = {
    getTrainingPalsList: () => instance.get('catalogs/training-pals')
}
