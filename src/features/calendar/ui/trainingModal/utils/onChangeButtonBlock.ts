import { TrainingParams } from '../../../model/types/types.ts';

export const onChangeButtonBlock = (
    date: string,
    searchExercises: TrainingParams[],
    setAddButtonBlock: (value: ((prevState: boolean) => boolean) | boolean) => void,
) => {
    const today = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const time = tomorrow.getTime();

    if (today.getTime() < time || searchExercises.length > 4) {
        setAddButtonBlock(true);
    } else {
        setAddButtonBlock(false);
    }
};
