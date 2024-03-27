import {TrafficList} from '../../../model/settings-slice.ts';

export type DrawerTariffComparisonProps = {
    onDrawerClose: () => void
    tariff: TrafficList
};
