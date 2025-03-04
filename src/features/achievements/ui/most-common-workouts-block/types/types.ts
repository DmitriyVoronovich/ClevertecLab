import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export type MostCommonWorkoutsBlockProps = {
    filterTraining: TrainingParams[]
    segmentValue: string
};

export type PopularItems = {
    [name: string]: number;
}
