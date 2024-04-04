import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export type ElementProps = {
    title: string
};

export type TableModalProps = {
    onModalClose: () => void
    train: TrainingParams
    modalStyle: {
        left: number,
        top: number
    }
    onEditDrawerOpen: (train: TrainingParams) => void
};
