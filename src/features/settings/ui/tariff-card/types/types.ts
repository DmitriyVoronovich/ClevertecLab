import {TrafficList} from '../../../model/settings-slice.ts';

export type TariffCardProps = {
    tariff: TrafficList
    onDrawerOpen: (tariff: TrafficList) => void
};
