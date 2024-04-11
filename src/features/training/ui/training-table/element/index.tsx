import {BadgeComponent} from '@components/badge-component';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';

import {ElementProps} from '../types/types.ts';

export const Element = ({title}: ElementProps) => {
    const trainingList = useAppSelector((state) => state.calendar.trainingList);

    const data = trainingList.find((item) => item.name === title);

    return (<BadgeComponent name={data?.name} color={data?.color} fontSize="14" index={1}
                            fontWeight="400" colorText="#3b3b3b"/>)
};
