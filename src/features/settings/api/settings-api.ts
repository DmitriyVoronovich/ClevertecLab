import {instance} from '../../../common/api';

import {Tariff} from './types/types.ts';

export const settingsApi = {
    getTrafficList() {
        return instance.get('catalogs/tariff-list');
    },
    addTariff(tariff: Tariff) {
        return instance.post('tariff', tariff);
    },
};
