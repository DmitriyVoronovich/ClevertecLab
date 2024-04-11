import {TrainingPals} from '../../../../model/types/types.ts';

export type UserInformationCardProps = {
    user: TrainingPals
    onShowModal: (user: TrainingPals) => void
    index: number
};
