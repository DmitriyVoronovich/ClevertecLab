import {TrainingParams} from "../../../../calendar/model/types/types.ts";

const sortByDate = (a: TrainingParams, b: TrainingParams) => new Date(a.date).getTime() - new Date(b.date).getTime();

const sortByPeriod = (a: TrainingParams, b: TrainingParams) => {
    if (a.parameters.period === null) return 1;
    if (b.parameters.period === null) return -1;

    return  b.parameters.period - a.parameters.period;
};

export const getSorter = (value: string) => {
    return (a: TrainingParams, b: TrainingParams) =>
        value === 'Периодичность' ? sortByPeriod(b, a) : sortByDate(a, b);
};
