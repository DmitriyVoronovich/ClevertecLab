import {TrainingPals} from '../../../../model/types/types.ts';

const statusOrder: { [index: string]: number } = {
    'accepted': 1,
    'pending': 2,
    'rejected': 3,
    null: 4
};

export const  sortUserCard = (currentItems: TrainingPals[]) =>{
    return currentItems.sort((a, b) => {
        if (statusOrder[a.status] < statusOrder[b.status]) {
            return -1;
        }
        if (statusOrder[a.status] > statusOrder[b.status]) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        return 0;
    });
};
