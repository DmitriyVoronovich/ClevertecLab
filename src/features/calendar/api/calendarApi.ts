import {instance} from "../../../common/api";

export const calendarApi = {
    getTraining() {
        return instance.get('training')
    },
    getTrainingList() {
        return instance.get('catalogs/training-list')
    },

};
