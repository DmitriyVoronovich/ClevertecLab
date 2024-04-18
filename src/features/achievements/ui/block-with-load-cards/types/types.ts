import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export type BlockWithLoadCardsProps = {
    filterTraining: TrainingParams[]
    training: Array<{ date: string, load: number }>
};
